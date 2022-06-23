import { Company } from './company.model'
import { Model } from './model'
import { Order } from './order.model'
import { ItemType } from '../types/api/item-type'

export class Item implements Model {
  id = ''
  name: string
  cost?: number
  description?: string
  type?: ItemType
  companyId?: string
  company?: Company
  orders?: Order[]
  createdAt?: Date | string
  updatedAt?: Date | string
}
