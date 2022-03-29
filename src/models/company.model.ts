import { Model } from './model'

export class Company implements Model {
  id = ''
  name = ''
  nit?: string
  email?: string
  address?: string
  phone?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}
