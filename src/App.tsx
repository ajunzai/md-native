import React, { useState } from 'react'
import FileList from './components/FileList'
import FileSearch from './components/FileSearch'
import OperateButton from './components/OperateButton'
import TableList from './components/tabList/TabList'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { v4 as uuidv4 } from 'uuid'

import { File } from './types/type'
import { flattenArr, objToArr } from './utils/helper'
import fileHelper from './utils/fileHelper'
const path = window.require('path')
const { remote } = window.require('electron')

const Store = window.require('electron-store')
//* 配置的文件信息储存位置 /Users/xiangjun/Library/Application Support/md-native/File\ data.json
const fileStore = new Store({ name: 'File data' })

const saveFileToStore = (files: object) => {
  // we don't have to store any info in file system, eg: isNew, body, etc
  const filesStoreObj = objToArr(files).reduce((result, file) => {
    const { id, path, title, createdAt } = file
    result[id] = {
      id,
      path,
      title,
      createdAt,
    }
    return result
  }, {})
  fileStore.set('files', filesStoreObj)
}

function App() {
  const [files, setFiles] = useState(fileStore.get('files') || {})
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
    // if openFiles don't have the current fileID
    // then add new fileId to the openedFileIDs
    if (!openedFileIDs.includes(fileID)) {
      setOpenedFileIDs([...openedFileIDs, fileID])
    }
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
    const deletePath = files[id].path
    fileHelper.deleteFile(deletePath).then(() => {
      Reflect.deleteProperty(files, id)
      setFiles(files)
      saveFileToStore(files)
      // close tab if opened
      tabClose(id)
    })
  }

  const updateFileName = (id: string, title: string, isNew: boolean) => {
    const newPath = path.join(saveLocation, `${title}.md`)
    const modifiedFile = { ...files[id], title, isNew: false, path: newPath }
    const newFiles = { ...files, [id]: modifiedFile }
    if (isNew) {
      fileHelper.writeFile(newPath, files[id].body).then(() => {
        setFiles(newFiles)
        saveFileToStore(newFiles)
      })
    } else {
      const oldPath = path.join(saveLocation, `${files[id].title}.md`)
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
    }
    setFiles({ ...files, [newId]: newFiles })
  }

  const importFiles = () => {}

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
                autoDownloadFontAwesome: false,
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
