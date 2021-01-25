export interface File {
  id: string
  title: string
  body: string
  createdAt: number
  isNew: boolean
  path: string
}
export interface FlattenFiles {
  [key: string]: File
}
