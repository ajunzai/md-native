import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFileImport } from "@fortawesome/free-solid-svg-icons";

const OperateButton: React.FC<any> = () => {
  return (
    <div className="flex h-8 ">
      <button className="flex-1 bg-gray-500 hover:bg-gray-300">
        <FontAwesomeIcon 
          title="新建" 
          size="lg" 
          icon={faPlus} 
        />
      </button>
      <button className="flex-1 bg-primary-blue hover:bg-opacity-60">
        <FontAwesomeIcon 
          title="导入" 
          size="lg" 
          icon={faFileImport} 
        />
      </button>
    </div>
  );
};

export default OperateButton;
