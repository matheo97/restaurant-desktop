import { SortOrder } from '../../types/sort-order'
import { useCallback, useEffect, useState } from 'react'
import { PaginationQuery } from '../../types/pagination-query'

function usePagination<OrderBy = string, Params = Record<string, unknown>>(
  callback: (params: PaginationQuery<OrderBy>, otherParams?: Params) => void,
  initialParams: PaginationQuery<OrderBy> = {}
) {
  const pageSize = initialParams.pageSize || 25
  const [params, setParams] = useState<Params>()
  const [page, setPage] = useState(initialParams.page || 1)
  const [order, setOrder] = useState<SortOrder | undefined>(
    initialParams.order || 'DESC'
  )
  const [search, setSearch] = useState<string | undefined>(
    initialParams.query || undefined
  )
  const [orderBy, setOrderBy] = useState<OrderBy | string | undefined>(
    initialParams.orderBy || 'createdAt'
  )

  const handleSort = (key?: OrderBy | string, order?: SortOrder) => {
    setOrderBy(key)
    setOrder(order)
  }

  const handleFind = useCallback(
    (_params?: Params) => {
      callback({
        page,
        order,
        orderBy,
        pageSize,
        query: search,
        ...params,
        ..._params,
      })
    },
    [callback, page, search, order, orderBy, params, pageSize]
  )

  useEffect(() => {
    callback({
      page,
      order,
      orderBy,
      pageSize,
      query: search,
      ...params,
    })
  }, [page, search, order, orderBy, params])

  return {
    setPage,
    setOrder,
    setSearch,
    setOrderBy,
    setSort: handleSort,
    setParams,
    page,
    params,
    order,
    search,
    orderBy,
    handleFind,
    pageSize,
  }
}

export default usePagination
