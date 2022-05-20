import { Company } from './company.model'
import { Model } from './model'

export class Customer implements Model {
  id = ''
  name: string
  lastName?: string
  email?: string
  address?: string
  phone?: string
  companyId?: string
  company?: Company
  createdAt?: Date | string
  updatedAt?: Date | string
}
