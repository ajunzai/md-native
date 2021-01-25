import React, { useState } from 'react'
import FileList from './components/FileList'
import FileSearch from './components/FileSearch'
import OperateButton from './components/OperateButton'
import TableList from './components/tabList/TabList'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { v4 as uuidv4 } from 'uuid'

import { File, FlattenFiles } from './types/type'
import { flattenArr, objToArr } from './utils/helper'
import fileHelper from './utils/fileHelper'
const { join, extname, basename, dirname } = window.require('path')
const { remote } = window.require('electron')

const Store = window.require('electron-store')
//* 配置的文件信息储存位置 /Users/xiangjun/Library/Application Support/md-native/File\ data.json
const fileStore = new Store({ name: 'File data' })

const saveFileToStore = (files: FlattenFiles) => {
  // we don't have to store any info in file system, eg: isNew, body, etc
  const filesStoreObj = objToArr(files).reduce((result, file) => {
    const { id, path, title, createdAt } = file
    result[id] = {
      id,
      path,
      title,
      createdAt: createdAt || new Date().getTime()
    }
    return result
  }, {})
  fileStore.set('files', filesStoreObj)
}

function App() {
  // TODO 初始化文件可能在系统中删除的bug
  const [files, setFiles] = useState(
    (fileStore.get('files') as FlattenFiles) || {}
  )
  const [activeFileID, setActiveFileID] = useState('')
  const [openedFileIDs, setOpenedFileIDs] = useState([] as string[])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([] as string[])
  const [searchFiles, setSearchFiles] = useState([] as File[])

  const avtiveFile = files[activeFileID]
  const openFiles: any = openedFileIDs.map((fileID) => files[fileID])
  // 操作用扁平化 ，显示用数组
  const fileArr = objToArr(files)
  const searchFileList = searchFiles.length ? searchFiles : fileArr
  // 新建markdown的文件所在目录
  const saveLocation = remote.app.getPath('documents')

  const fileClick = (fileID: string) => {
    // set current active file
    setActiveFileID(fileID)
    // TODO 打开文件需要读取文件，不用每次打开而且打开是读取保存后的文件
    fileHelper.readFile(files[fileID].path).then((data: any) => {
      console.log('dafa', data)
      console.log('file', files)
      // if openFiles don't have the current fileID
      // then add new fileId to the openedFileIDs
      if (!openedFileIDs.includes(fileID)) {
        setOpenedFileIDs([...openedFileIDs, fileID])
      }
    })
  }

  const tabCilck = (fileID: string) => {
    setActiveFileID(fileID)
  }

  const tabClose = (fileID: string) => {
    const tabsWithout = openedFileIDs.filter((id) => id !== fileID)
    setOpenedFileIDs(tabsWithout)
    // set the active to the first opened tab if still tabs left
    if (tabsWithout.length) {
      if (fileID === activeFileID) {
        setActiveFileID(tabsWithout[0])
      }
    } else {
      setActiveFileID('')
    }
  }

  const fileChange = (id: string, value: string) => {
    // loop through file Array to update the new file
    const newFile = { ...files[id], body: value }
    setFiles({ ...files, [id]: newFile })
    if (!unsavedFileIDs.includes(id)) {
      setUnsavedFileIDs([...unsavedFileIDs, id])
    }
  }

  const fileDelete = (id: string) => {
    //* 用delete或者Reflect.deleteProperty删除，react不会识别数据变化，必须要变异操作
    const { [id]: value, ...afterFils } = files
    if (files[id].isNew) {
      setFiles(afterFils)
    } else {
      const deletePath = files[id].path
      fileHelper.deleteFile(deletePath).then(() => {
        // 点击esc后，input框未消失，react没有检测到文件的变化
        setFiles(afterFils)
        saveFileToStore(afterFils)
        // close tab if opened
        tabClose(id)
      })
    }
  }

  const updateFileName = (id: string, title: string, isNew: boolean) => {
    const newPath = isNew
      ? join(saveLocation, `${title}.md`)
      : join(dirname(files[id].path), `${title}.md`)
    const modifiedFile = { ...files[id], title, isNew: false, path: newPath }
    const newFiles = { ...files, [id]: modifiedFile }
    if (isNew) {
      // TODO 新建文件重命名
      fileHelper.writeFile(newPath, files[id].body).then(() => {
        setFiles(newFiles)
        saveFileToStore(newFiles)
      })
    } else {
      const oldPath = join(saveLocation, `${files[id].title}.md`)
      fileHelper.renameFile(oldPath, newPath).then(() => {
        setFiles(newFiles)
        saveFileToStore(newFiles)
      })
    }
  }

  const fileSearch = (keyword: string) => {
    const newFiles = fileArr.filter((file) => file.title.includes(keyword))
    setSearchFiles(newFiles)
  }

  const createNewFile = () => {
    const newId = uuidv4()
    const newFiles: File = {
      id: newId,
      title: '',
      body: '##  请输入markdown',
      createdAt: new Date().getTime(),
      isNew: true,
      path: ''
    }
    setFiles({ ...files, [newId]: newFiles })
  }

  const importFiles = () => {
    remote.dialog
      .showOpenDialog({
        title: '请选择导入 markDown 文件',
        properties: ['openFile', 'multiSelections'],
        filters: [{ name: 'markdown', extensions: ['md'] }]
      })
      .then((result: any) => {
        if (result.canceled) {
          return
        }
        const filteredPaths = result.filePaths.filter((path: string) => {
          return !Object.values(files).find((file: File) => path === file.path)
        })
        if (filteredPaths.length) {
          // TODO 可以直接读取body内容
          //! 导入文件打开没内容
          type importype = Pick<File, 'id' | 'title' | 'path'>[]
          const importFilesArr: importype = filteredPaths.map(
            (path: string) => ({
              id: uuidv4(),
              title: basename(path, extname(path)),
              path
            })
          )
          const newFiles = { ...files, ...flattenArr(importFilesArr) }
          setFiles(newFiles)
          saveFileToStore(newFiles)
          remote.dialog.showMessageBox({
            type: 'info',
            title: `成功导入了${importFilesArr.length}个文件`,
            message: `成功导入了${importFilesArr.length}个文件`
          })
        }
        //["/Users/xiangjun/Desktop/name1.md", "/Users/xiangjun/Desktop/name2.md"]
        console.log(result.filePaths)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  return (
    <div className="App flex h-full">
      <div className="flex flex-col w-1/4 min-w-panel-l">
        <FileSearch title="我的云文档" onFileSearch={fileSearch} />
        <FileList
          files={searchFileList}
          onFileClick={fileClick}
          onFileDelete={fileDelete}
          onSaveEdit={updateFileName}
        />
        <OperateButton
          createNewFile={createNewFile}
          importFiles={importFiles}
        />
      </div>
      <div className="right-panel w-3/4">
        {avtiveFile && (
          <>
            <TableList
              files={openFiles}
              activeId={avtiveFile.id}
              unsaveIds={unsavedFileIDs}
              onTabClick={tabCilck}
              onTabClose={tabClose}
            />
            <SimpleMDE
              key={avtiveFile.id}
              className="min-h-editor"
              value={avtiveFile.body}
              onChange={(value) => fileChange(avtiveFile.id, value)}
              options={{
                minHeight: '525px',
                autoDownloadFontAwesome: false
              }}
            />
          </>
        )}
        {!avtiveFile && (
          <div className="flex h-full justify-center items-center text-3xl text-desc-normal">
            选择或创建新的markdown文档
          </div>
        )}
      </div>
    </div>
  )
}

export default App
