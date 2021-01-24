import React, { useState } from 'react'
import FileList from './components/FileList'
import FileSearch from './components/FileSearch'
import OperateButton from './components/OperateButton'
import TableList from './components/tabList/TabList'
import defaultFiles from './utils/defaultFiles'
import SimpleMDE from 'react-simplemde-editor'
import { File } from './types/type'
import { uuid } from 'uuidv4'
import 'easymde/dist/easymde.min.css'

function App() {
  const [files, setFiles] = useState(defaultFiles)
  const [activeFileID, setActiveFileID] = useState('')
  const [openedFileIDs, setOpenedFileIDs] = useState([] as string[])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([] as string[])
  const [searchFiles, setSearchFiles] = useState([] as File[])
  const openFiles: any = openedFileIDs.map((fileID) => {
    return files.find((file) => file.id === fileID)
  })

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
    // remove current id from openedFileIDs
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
    const newFiles = files.map((file) => {
      if (file.id === id) {
        file.title = value
      }
      return file
    })
    setFiles(newFiles)
    if (!unsavedFileIDs.includes(id)) {
      setUnsavedFileIDs([...unsavedFileIDs, id])
    }
  }

  const fileDelete = (id: string) => {
    const newFiles = files.filter((file) => file.id !== id)
    setFiles(newFiles)
    // close tab if opened
    tabClose(id)
  }

  const updateFileName = (id: string, title: string) => {
    const newFiles = files.map((file) => {
      if (file.id === id) {
        file.title = title
        file.isNew = false
      }
      return file
    })
    setFiles(newFiles)
  }

  // const updateFileAttr = (id: string, attr: string) => {
  //   const newFiles = files.map((file) => {
  //     if (file.id === id) {
  //       file.title = attr
  //     }
  //     return file
  //   })
  //   setFiles(newFiles)
  // }

  const fileSearch = (keyword: string) => {
    const newFiles = files.filter((file) => file.title.includes(keyword))
    setSearchFiles(newFiles)
  }

  const createNewFile = () => {
    const newFiles: File = {
      id: uuid(),
      title: '',
      body: '##  请输入markdown',
      createdAt: new Date().getTime(),
      isNew: true,
    }
    setFiles([...files, newFiles])
  }

  const importFiles = () => {}
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
