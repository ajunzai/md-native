import React from 'react';
import FileList from './components/FileList';
// import './App.scss'
import FileSearch from './components/FileSearch'
import defaultFiles from './utils/defaultFiles';
function App() {
  return (
    <div className="App flex h-full">
      <div className="left-panel w-1/4">
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
      </div>
      <div className="right-panel w-3/4 bg-blue-400">this is right</div>
    </div>
  );
}

export default App;
