import { UserRole } from '../types/api/user-role'
import { Company } from './company.model'
import { Model } from './model'

export interface User extends Model {
  id: string
  name: string
  lastName?: string
  email?: string
  phone?: string
  role: UserRole
  password?: string
  companyId?: string
  company?: Company
}
