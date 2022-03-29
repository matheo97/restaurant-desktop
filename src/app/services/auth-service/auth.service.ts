import axios from '../base'
import {
  SignInRequestBody,
  SignInResponseBody,
  MeResponseBody,
} from './auth.types'

export class AuthService {
  private url = '/auth'

  signIn = async (values: SignInRequestBody): Promise<SignInResponseBody> => {
    console.log('values', values)

    try {
      const { data } = await axios.post<SignInResponseBody>(
        `${this.url}/login`,
        {
          username: values.username,
          password: values.password,
        }
      )
      return data
    } catch (e) {
      throw new Error(e)
    }
  }

  me = async (token?: string): Promise<MeResponseBody> => {
    let data: MeResponseBody | null = null
    try {
      if (token) {
        console.log('token', token)
        axios.defaults.headers.common['Authorization'] = token
        const res = await axios.get<MeResponseBody>(`${this.url}/profile`, {
          headers: { Authorization: token },
        })
        data = res.data
      } else {
        console.log('no token')
        const res = await axios.get<MeResponseBody>(`${this.url}/profile`)
        data = res.data
      }
      if (!data) throw new Error('Not found')
      return data
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const authService = new AuthService()
