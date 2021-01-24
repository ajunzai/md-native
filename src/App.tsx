import React, { useState } from 'react'
import FileList from './components/FileList'
import FileSearch from './components/FileSearch'
import OperateButton from './components/OperateButton'
import TableList from './components/tabList/TabList'
import defaultFiles from './utils/defaultFiles'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

function App() {
  const [files, setFiles] = useState(defaultFiles)
  const [activeFileID, setActiveFileID] = useState(0)
  const [openedFileIDs, setOpenedFileIDs] = useState([] as number[])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([] as number[])

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
    const newFiles = files.map((file) => {
      if (file.id === id) {
        file.body = value
      }
      return file
    })
    setFiles(newFiles)
    if (!unsavedFileIDs.includes(id)) {
      setUnsavedFileIDs([...unsavedFileIDs, id])
    }
  }

  const avtiveFile = files.find((file) => file.id === activeFileID)
  return (
    <div className="App flex h-full">
      <div className="flex flex-col w-1/4 min-w-panel-l">
        <FileSearch
          title="我的云文档"
          onFileSearch={(val: string) => {
            console.log(val)
          }}
        />
        <FileList
          files={files}
          onFileClick={fileClick}
          onFileDelete={(id: number) => {
            console.log(id)
          }}
          onSaveEdit={(id: number, value: string) => {
            console.log(id, value)
          }}
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
