export interface tableDataType {
  list: { date: string; name: string; address: string }[]
  columns: { prop: string; label: string; width?: number; type: string | undefined }[]
  options: { tableHeight: number }
}
export interface tableItemType {
  prop: string
  label: string
  type?: string | undefined
  slot?: string | undefined | null
}
