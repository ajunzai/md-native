import React, { useState } from 'react'
import FileList from './components/FileList'
import FileSearch from './components/FileSearch'
import OperateButton from './components/OperateButton'
import TableList from './components/tabList/TabList'
import defaultFiles from './utils/defaultFiles'
import SimpleMDE from 'react-simplemde-editor'
import { File } from './types/type'
import { v4 as uuidv4 } from 'uuid'
import { flattenArr, objToArr } from './utils/helper'
import 'easymde/dist/easymde.min.css'

function App() {
  const [files, setFiles] = useState(flattenArr(defaultFiles))
  console.log(files)
  const [activeFileID, setActiveFileID] = useState('')
  const [openedFileIDs, setOpenedFileIDs] = useState([] as string[])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([] as string[])
  const [searchFiles, setSearchFiles] = useState([] as File[])

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
    Reflect.deleteProperty(files, id)
    setFiles(files)
    // close tab if opened
    tabClose(id)
  }

  const updateFileName = (id: string, title: string) => {
    const newFile = { ...files[id], title, isNew: false }
    setFiles({ ...files, [id]: newFile })
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

  const avtiveFile = files[activeFileID]
  const openFiles: any = openedFileIDs.map((fileID) => files[fileID])

  // 操作用扁平化 ，显示用数组
  const fileArr = objToArr(files)
  const searchFileList = searchFiles.length ? searchFiles : fileArr
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
