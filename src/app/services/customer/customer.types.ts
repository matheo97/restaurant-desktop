import { Customer } from '../../../models/customer.model'
import { CustomerOrderBy } from '../../types/customer-order-by'
import { PaginationQuery } from '../../types/pagination-query'
import { PaginationResponse } from '../../types/pagination-response'

export type FindCustomersResponse = PaginationResponse<Customer>
export type FindCustomersQuery = PaginationQuery<CustomerOrderBy>

export type CreateCustomer = Omit<Customer, 'id'> & {
  id?: string
}
export type UpdateCustomer = Omit<Customer, 'id'> & {
  id?: string
}
