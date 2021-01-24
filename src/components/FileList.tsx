import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'

import { File } from '../types/type'
import useKeyPress from '../hooks/useKeyPress'
interface FileListprops {
  files: File[]
  onSaveEdit: Function
  onFileDelete: Function
  onFileClick: Function
}
//! 在点击列表后点击搜索有bug，需要增加全局监听事件
const FileList: React.FC<FileListprops> = ({
  files,
  onFileDelete,
  onFileClick,
  onSaveEdit,
}) => {
  const [editStatus, setEditStatus] = useState('')
  const [value, setValue] = useState('')

  // TODO 是否还可以拆分hook

  // 取键盘事件的hooks
  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)

  const inputRef = useRef(null)

  const toggleEdit = (file: File) => {
    setEditStatus(file.id)
    setValue(file.title)
  }

  const closeSearch = (file?: File) => {
    setEditStatus('')
    setValue('')
    // if we are editing a newly created file, we should delete this file when pressing esc
    if (file?.isNew) {
      onFileDelete(file.id)
    }
  }

  useEffect(() => {
    const editItem = files.find((file) => file.id === editStatus)
    if (escPressed && editStatus) {
      closeSearch(editItem as File)
    }
    if (enterPressed && editStatus && value.trim() !== '') {
      onSaveEdit((editItem as File).id, value, (editItem as File).isNew)
      closeSearch()
    }
  })

  useEffect(() => {
    if (editStatus) {
      ;(inputRef as any).current.focus()
    }
  }, [editStatus])

  // add new file should set Status
  useEffect(() => {
    const newFile = files.find((file) => file.isNew)
    if (newFile) {
      setEditStatus(newFile.id)
    }
  }, [files])
  return (
    <ul className="h-full">
      {files.map((file) => (
        <li
          className="flex h-10 px-2 items-center hover:bg-blue-100 cursor-pointer"
          key={file.id}
        >
          {file.id !== editStatus && !file.isNew && (
            <>
              <FontAwesomeIcon size="lg" icon={faMarkdown} />
              <span
                className="flex-grow h-search leading-10 pl-1.5 min-w-title"
                onClick={() => onFileClick(file.id)}
              >
                {file.title}
              </span>
              <button
                type="button"
                className="w-8"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleEdit(file)
                }}
              >
                <FontAwesomeIcon title="编辑" size="lg" icon={faEdit} />
              </button>
              <button
                type="button"
                className="w-8"
                onClick={(e) => {
                  e.stopPropagation()
                  onFileDelete(file.id)
                }}
              >
                <FontAwesomeIcon title="删除" size="lg" icon={faTrashAlt} />
              </button>
            </>
          )}
          {(file.id === editStatus || file.isNew) && (
            <>
              <input
                className="flew-grow w-full rounded-sm pl-1.5"
                placeholder="请输入文件名称"
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button className="w-8" onClick={() => closeSearch(file)}>
                <FontAwesomeIcon title="关闭" size="lg" icon={faTimes} />
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  )
}

export default FileList
