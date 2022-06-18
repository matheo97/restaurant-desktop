import { PaginationQuery } from '../../types/pagination-query'
import { PaginationResponse } from '../../types/pagination-response'
import { Item } from '../../../models'
import { ItemOrderBy } from '../../types/item-order-by'

export type FindItemsResponse = PaginationResponse<Item>
export type FindItemsQuery = PaginationQuery<ItemOrderBy>

export type CreateItem = Omit<Item, 'id'> & {
  id?: string
}
export type UpdateItem = Omit<Item, 'id'> & {
  id?: string
}
