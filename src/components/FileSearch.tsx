import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import useKeyPress from '../hooks/useKeyPress'
interface Iprop {
  title: string
  onFileSearch: Function
}

const FileSearch: React.FC<Iprop> = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false)
  const [value, setValue] = useState('')

  // 取键盘事件的hooks
  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)

  const inputRef = useRef(null)

  useEffect(() => {
    if (escPressed && inputActive) {
      closeSearch()
    }
    if (enterPressed && inputActive) {
      onFileSearch(value)
    }
  })

  useEffect(() => {
    if (inputActive) {
      ;(inputRef as any).current.focus()
    }
  }, [inputActive])
  const closeSearch = () => {
    setInputActive(false)
    setValue('')
    onFileSearch(false)
  }
  return (
    <div className="flex justify-between items-center box-border w-full h-8 px-2.5 bg-gray-300 rounded-sm">
      {!inputActive && (
        <>
          <span className="flew-grow pl-2 leading-8 h-8">{title}</span>
          <button
            type="button"
            className="w-8"
            onClick={() => setInputActive(true)}
          >
            <FontAwesomeIcon title="搜索" size="lg" icon={faSearch} />
          </button>
        </>
      )}
      {inputActive && (
        <>
          <input
            className="flew-grow w-full rounded-sm pl-1.5"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="w-8" onClick={closeSearch}>
            <FontAwesomeIcon title="关闭" size="lg" icon={faTimes} />
          </button>
        </>
      )}
    </div>
  )
}

export default FileSearch
