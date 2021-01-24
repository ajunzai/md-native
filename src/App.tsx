import React, { useState } from 'react'
import FileList from './components/FileList'
import FileSearch from './components/FileSearch'
import OperateButton from './components/OperateButton'
import TableList from './components/tabList/TabList'
import defaultFiles from './utils/defaultFiles'
import SimpleMDE from 'react-simplemde-editor'
import { File } from './types/type'
import 'easymde/dist/easymde.min.css'

function App() {
  const [files, setFiles] = useState(defaultFiles)
  const [activeFileID, setActiveFileID] = useState(0)
  const [openedFileIDs, setOpenedFileIDs] = useState([] as number[])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([] as number[])
  const [searchFiles, setSearchFiles] = useState([] as File[])
  const openFiles: any = openedFileIDs.map((fileID) => {
    return files.find((file) => file.id === fileID)
  })

  const fileClick = (fileID: number) => {
    // set current active file
    setActiveFileID(fileID)
    // if openFiles don't have the current fileID
    // then add new fileId to the openedFileIDs
    if (!openedFileIDs.includes(fileID)) {
      setOpenedFileIDs([...openedFileIDs, fileID])
    }
  }

  const tabCilck = (fileID: number) => {
    setActiveFileID(fileID)
  }

  const tabClose = (fileID: number) => {
    // remove current id from openedFileIDs
    const tabsWithout = openedFileIDs.filter((id) => id !== fileID)
    setOpenedFileIDs(tabsWithout)
    // set the active to the first opened tab if still tabs left
    if (tabsWithout.length) {
      if (fileID === activeFileID) {
        setActiveFileID(tabsWithout[0])
      }
    } else {
      setActiveFileID(0)
    }
  }

  const fileChange = (id: number, value: string) => {
    // loop through file Array to update the new file
    updateFileAttr(id, value)
    if (!unsavedFileIDs.includes(id)) {
      setUnsavedFileIDs([...unsavedFileIDs, id])
    }
  }

  const fileDelete = (id: number) => {
    const newFiles = files.filter((file) => file.id !== id)
    setFiles(newFiles)
    // close tab if opened
    tabClose(id)
  }

  const updateFileName = (id: number, title: string) => {
    updateFileAttr(id, title)
  }

  const updateFileAttr = (id: number, attr: string) => {
    const newFiles = files.map((file) => {
      if (file.id === id) {
        file.title = attr
      }
      return file
    })
    setFiles(newFiles)
  }

  const fileSearch = (keyword: string) => {
    const newFiles = files.filter((file) => file.title.includes(keyword))
    setSearchFiles(newFiles)
  }

  const avtiveFile = files.find((file) => file.id === activeFileID)
  const searchFileList = searchFiles.length ? searchFiles : files
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
        <OperateButton />
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
