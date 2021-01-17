import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'

import { File } from '../types/type'
interface FileListprops {
  files: File[]
  onSaveEdit: Function
  onFileDelete: Function
  onFileClick: Function
}
const FileList: React.FC<FileListprops> = ({ files, onFileDelete, onFileClick, onSaveEdit }) => {
  const [editStatus, setEditStatus] = useState(0)
  const [value, setValue] = useState('')
	const inputRef = useRef(null)

  const toggleEdit = (file: File) => {
    setEditStatus(file.id)
    setValue(file.title)
  }

  const closeSearch = () => {
		setEditStatus(0)
		setValue('')
	}

  useEffect(() => {
		const keyUpFn = (event: any) => {
			const {keyCode} = event
			if (keyCode === 27 && editStatus) {
				closeSearch()
			} else if (keyCode === 13 && editStatus) {
				onSaveEdit(editStatus, value)
			}
		}
		document.addEventListener('keyup', keyUpFn)
		return () => {
			document.removeEventListener('keyup', keyUpFn)
		}
  })
  
  useEffect(() => {
		if (editStatus) {
			(inputRef as any).current.focus()
		}
	}, [editStatus])
  return (
    <ul>
      {
        files.map(file => (
          <li
            className="flex h-10 p-2 items-center hover:bg-blue-100 cursor-pointer"
            key={file.id}
          >
            {
              file.id !== editStatus &&
              <>
                <FontAwesomeIcon
                  size="lg"
                  icon={faMarkdown}
                />
                <span className="flex-grow pl-1.5" onClick={onFileClick(file.id)}>{file.title}</span>
                <button type="button" className="w-8" onClick={() => {toggleEdit(file)}}>
                  <FontAwesomeIcon
                    title="编辑"
                    size="lg"
                    icon={faEdit}
                  />
                </button>
                <button type="button" className="w-8" onClick={() => {onFileDelete(file.id)}}>
                  <FontAwesomeIcon
                    title="删除"
                    size="lg"
                    icon={faTrashAlt}
                  />
                </button>
              </>
            }
            {
              file.id === editStatus &&
              <>
                <input 
                  className="flew-grow w-full rounded-sm pl-1.5" 
                  ref={inputRef} 
                  value={value} 
                  onChange={(e) => setValue(e.target.value)} />
                <button className="w-8" onClick={closeSearch}>
                  <FontAwesomeIcon
                    title="关闭"
                    size="lg"
                    icon={faTimes}
                  />
                </button>
              </>
            }
          </li>
        ))
      }
    </ul>
  )
}

export default FileList