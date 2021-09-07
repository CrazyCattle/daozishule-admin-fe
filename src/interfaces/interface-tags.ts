export interface tagsType {
  _id?: string
  name: string
  url: string
  createAt?: string
}
export interface tagType {
  title: string
}
export interface ArticleType {
  _id?: string
  title: string
  author: string
  describe: string
  content: string
  views: number
  thumbsUp: number
  categoray: []
  createAt: string
}
