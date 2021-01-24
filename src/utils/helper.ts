import { File } from '../types/type'
interface flattenType {
  [id: string]: File
}
export const flattenArr = (arr: Array<File>): flattenType => {
  return arr.reduce((map: flattenType, item: File) => {
    map[item.id] = item
    return map
  }, {})
}

export const objToArr = (obj: any) => {
  return Object.keys(obj).map((key) => obj[key])
}
