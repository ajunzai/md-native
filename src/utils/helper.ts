import { File, FlattenFiles } from '../types/type'

export const flattenArr = (arr: Array<File>): FlattenFiles => {
  return arr.reduce((map: FlattenFiles, item: File) => {
    map[item.id] = item
    return map
  }, {})
}

export const objToArr = (obj: any) => {
  return Object.keys(obj).map((key) => obj[key])
}
