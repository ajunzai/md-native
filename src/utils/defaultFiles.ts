import { File } from '../types/type'

const defaultFiles: Array<File> = [
  {
    id: '1',
    title: 'first md',
    body: '*should be aware of this*',
    createdAt: 1563762965704,
    isNew: false,
    path: '',
  },
  {
    id: '2',
    title: 'second post',
    body: '## this is the title',
    createdAt: 1563762965704,
    isNew: false,
    path: '',
  },
  {
    id: '3',
    title: '你好世界',
    body: '### 这是另外一个小标题欧',
    createdAt: 1563762965704,
    isNew: false,
    path: '',
  },
  {
    id: '4',
    title: '你好世界',
    body: '**粗体内容**',
    createdAt: 1563762965704,
    isNew: false,
    path: '',
  },
]

export default defaultFiles
