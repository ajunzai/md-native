// 如果不加window webpack为从bunlde里面找，也就是node_modules里面。
// 加上window就会通过node.js去寻找
const fs = window.require('fs').promises
const fileHelper = {
  readFile: (path: any) => {
    return fs.readFile(path, { encoding: 'utf8' })
  },
  writeFile: (path: any, content: any) => {
    return fs.writeFile(path, content, { encoding: 'utf8' })
  },
  renameFile: (path: any, newPath: any) => {
    return fs.rename(path, newPath)
  },
  deleteFile: (path: any) => {
    return fs.unlink(path)
  },
}

export default fileHelper
