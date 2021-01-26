import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { File } from '../../types/type'
import './index.scss'
import classnames from 'classnames'
interface Tabs {
  files: File[]
  activeId: string
  unsaveIds: string[]
  onTabClick: Function
  onTabClose: Function
}
const TabList: React.FC<Tabs> = ({
  files,
  activeId,
  unsaveIds,
  onTabClick,
  onTabClose
}) => {
  return (
    <ul className="flex w-full h-7">
      {files.map((file) => {
        const withUnsaveMark = unsaveIds.includes(file.id)
        console.log(unsaveIds, file.id)
        const liStyle = classnames('tab-item', {
          active: activeId === file.id,
          withUnsaved: withUnsaveMark
        })
        return (
          <li className="nav-item" key={file.id}>
            <div
              className={liStyle}
              onClick={(e) => {
                e.preventDefault()
                onTabClick(file.id)
              }}
            >
              <span>{file.title}</span>
              <span
                className="close-icon ml-2"
                onClick={(e) => {
                  e.stopPropagation()
                  onTabClose(file.id)
                }}
              >
                <FontAwesomeIcon title="关闭" icon={faTimes} />
              </span>
              {withUnsaveMark && (
                <span className="unsave-icon ml-2 bg-gray-500 rounded-full"></span>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default TabList
