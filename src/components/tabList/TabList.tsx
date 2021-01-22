import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { File } from "../../types/type";
import "./index.scss";
import classnames from "classnames";
interface Tabs {
  files: File[];
  activeId: number;
  unsaveIds: number[];
} 
const TabList: React.FC<Tabs> = ({ files, activeId, unsaveIds }) => {
  return (
    <ul className="flex w-full h-8">
      {files.map((file) => {
        const liStyle = classnames("tab-item", {
          ["bg-blue-200"]: activeId == file.id,
          'active': activeId == file.id
        });
        const withUnsaveMark = unsaveIds.includes(file.id);
        return (
          <li className={liStyle} key={file.id}>
            <span>{file.title}</span>
            <span className="icon-close ml-2">
              <FontAwesomeIcon title="关闭" icon={faTimes} />
            </span>
            {withUnsaveMark && (
              <span className="unsave w-3 h-3 bg-gray-500 rounded-full"></span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default TabList;
