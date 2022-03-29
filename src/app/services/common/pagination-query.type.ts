export type PaginationQuery<T = string, U = Record<string, unknown>> = {
  page?: number
  pageSize?: number
  order?: 'ASC' | 'DESC'
  orderBy?: T
  query?: string
} & U
