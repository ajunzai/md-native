import React from 'react';
import FileList from './components/FileList';
// import './App.scss'
import FileSearch from './components/FileSearch'
import defaultFiles from './utils/defaultFiles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <div className="App flex h-full">
      <div className="flex flex-col w-1/4">
        <FileSearch 
          title="我的云文档"
          onFileSearch={(val: string) => {console.log(val);}}
        />
        <FileList
          files={defaultFiles}
          onFileClick={(id: number) => {console.log(id)}}
          onFileDelete={(id: number) => {console.log(id)}}
          onSaveEdit={(id: number, value: string) => {console.log(id, value)}}
        />
        <div className="flex h-8 ">
          <button className="flex-1 bg-gray-500 hover:bg-gray-300">
            <FontAwesomeIcon
              title="新建"
              size="lg"
              icon={faPlus}
            />
          </button>
          <button className="flex-1 bg-blue-500 hover:bg-blue-300">
            <FontAwesomeIcon
              title="导入"
              size="lg"
              icon={faFileImport}
            />
          </button>
        </div>
      </div>
      <div className="right-panel w-3/4 bg-blue-400">this is right</div>
    </div>
  );
}

export default App;
