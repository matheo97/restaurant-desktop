import { Company } from './company.model'
import { Customer } from './customer.model'
import { Model } from './model'
import { User } from './user.model'
import { Item } from './item.model'
import { OrderStatus } from '../types/api/order-status'

export class Order implements Model {
  id = ''
  status?: OrderStatus
  subTotal?: number
  tax?: number
  discount?: number
  grandTotal?: number
  companyId?: string
  company?: Company
  clientId?: string
  client?: Customer
  userId?: string
  user?: User
  items?: Item[]
  createdAt?: Date | string
  updatedAt?: Date | string
}
