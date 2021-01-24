import React from 'react'
import FileList from './components/FileList'
import FileSearch from './components/FileSearch'
import OperateButton from './components/OperateButton'
import TableList from './components/tabList/TabList'
import defaultFiles from './utils/defaultFiles'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

function App() {
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
          files={defaultFiles}
          onFileClick={(id: number) => {
            console.log(id)
          }}
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
        <TableList
          files={defaultFiles}
          activeId={1}
          unsaveIds={[1, 3]}
          onTabClick={(id: any) => console.log(id)}
          onCloseTab={(id: any) => console.log('close', id)}
        />
        <SimpleMDE
          className="min-h-editor"
          value={defaultFiles[1].body}
          onChange={(value) => {
            console.log(value)
          }}
          options={{
            minHeight: '525px',
            autoDownloadFontAwesome: false,
          }}
        />
      </div>
    </div>
  )
}

export default App
