import { useEffect, useRef } from 'react'
const { remote } = window.require('electron')
const { Menu, MenuItem } = remote
const useContextMenu = (menuArr: any[], selectTarget: string) => {
  let clickedElement = useRef(null)
  useEffect(() => {
    const menu = new Menu()
    menuArr.forEach((item) => {
      menu.append(new MenuItem(item))
    })
    const handleContextMenu = (e: any) => {
      console.log(document.querySelector(selectTarget))
      console.log(e.target)
      if (document.querySelector(selectTarget)?.contains(e.target)) {
        clickedElement.current = e.target
        menu.popup({ window: remote.getCurrentWindow() })
      }
    }
    window.addEventListener('contextmenu', handleContextMenu)
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])
  return clickedElement
}

export default useContextMenu
