import React from 'react';
// import './App.scss'
import FileSearch from './components/FileSearch'

function App() {
  return (
    <div className="App flex h-full">
      <div className="left-panel w-1/4">
        <FileSearch 
          title="我的云文档"
          onFileSearch={(val: string) => {console.log(val);
          }}/>
      </div>
      <div className="right-panel w-3/4 bg-blue-400">this is right</div>
    </div>
  );
}

export default App;
