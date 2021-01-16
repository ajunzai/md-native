import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
interface Iprop {
	title: string
	onFileSearch: Function
}

const FileSearch: React.FC<Iprop> = ({ title, onFileSearch }) => {
	const [inputActive, setInputActive] = useState(false)
	const [value, setvalue] = useState('')
	const inputRef = useRef(null)
	useEffect(() => {
		const keyUpFn = (event: any) => {
			const {keyCode} = event
			if (keyCode === 27 && inputActive) {
				closeSearch()
			} else if (keyCode === 13 && inputActive) {
				onFileSearch(value)
			}
		}
		document.addEventListener('keyup', keyUpFn)
		return () => {
			document.removeEventListener('keyup', keyUpFn)
		}
	})

	useEffect(() => {
		if (inputActive) {
			(inputRef as any).current.focus()
		}
	}, [inputActive])
	const closeSearch = () => {
		setInputActive(false)
		setvalue('')
		onFileSearch(false)
	}
	return (
		<div className="flex justify-center items-center box-content w-full h-8 px-2.5 mt-1.5 bg-blue-300 rounded-sm">
			{ !inputActive &&
				<>
					<span className="inline-block pl-2 leading-8 w-3/4 h-8">{title}</span>
					<button type="button" className="w-1/4" onClick={() =>setInputActive(true)} >
						<FontAwesomeIcon
							title="搜索"
							size="lg"
							icon={faSearch}
						/>
					</button>
				</>
			}
			{ inputActive &&
				<>
					<input className="w-3/4 rounded-sm pl-1.5" ref={inputRef} value={value} onChange={(e) => setvalue(e.target.value)} />
					<button className="w-1/4" onClick={closeSearch}>
						<FontAwesomeIcon
							title="关闭"
							size="lg"
							icon={faTimes}
						/>
					</button>
				</>
			}
		</div>
	)
}

export default FileSearch