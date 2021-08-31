export interface tableDataType {
  list: { date?: string; name?: string; address?: string }[]
  columns: { prop: string; label: string; width?: number }[]
  options: { tableHeight: number }
}
export interface tableItemType {
  prop: string
  label: string
  type?: string | undefined
  slot?: string | undefined | null
}

export interface ReactiveProps<T> {
  tableData: TableData<T>
}
export interface TableData<T> {
  list: T[]
  columns: ColumnsProps[]
  options: {
    tableHeight: number
  }
}
export interface ColumnsProps {
  prop: string
  label: string
  width?: number
  fixed?: boolean
}
