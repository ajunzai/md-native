import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'
interface Operate {
  createNewFile: () => void
  importFiles: () => void
}
const OperateButton: React.FC<Operate> = ({ createNewFile, importFiles }) => {
  return (
    <div className="flex h-8 ">
      <button
        className="flex-1 bg-gray-500 hover:bg-gray-300"
        type="button"
        onClick={createNewFile}
      >
        <FontAwesomeIcon title="新建" size="lg" icon={faPlus} />
      </button>
      <button
        className="flex-1 bg-primary-blue hover:bg-opacity-60"
        onClick={importFiles}
      >
        <FontAwesomeIcon title="导入" size="lg" icon={faFileImport} />
      </button>
    </div>
  )
}

export default OperateButton
