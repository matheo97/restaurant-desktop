import { User } from '../../../models'
import { Auth } from '../common/auth.type'

export type SignInRequestBody = {
  username: string
  password: string
}

export type SignInResponseBody = Auth

export type MeResponseBody = User
