import { useState, useEffect } from 'react'

const useKeyPress = (targetKeyCode: any) => {
  const [keyPressed, setKeyPressed] = useState(false)

  const keyUpHandler = ({ keyCode }: any) => {
    if (keyCode === targetKeyCode) {
      setKeyPressed(false)
    }
  }
  const keyDownHandler = ({ keyCode }: any) => {
    if (keyCode === targetKeyCode) {
      setKeyPressed(true)
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
      document.removeEventListener('keyup', keyUpHandler)
    }
    // eslint-disable-next-line
  }, [])
  return keyPressed
}

export default useKeyPress
