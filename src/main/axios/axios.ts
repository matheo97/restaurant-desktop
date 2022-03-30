import { Auth } from 'app/services/common/auth.type'
import AxiosModule, { AxiosInstance } from 'axios'

class AxiosManager {
  public instance: AxiosInstance

  constructor() {
    this.instance = AxiosModule.create({
      baseURL: process.env.API_URL,
      timeout: 15000,
    })
    this.instance.interceptors.response.use(
      response => response,
      async error => {
        console.log({ error })
        const { message: defaultMessage, response } = error
        let message = 'Background task service failed'
        if (response && response.data) {
          message =
            response.data.message || response.data.error || defaultMessage
          if (Array.isArray(message)) {
            message = message.join('\n')
          }
        }
        return Promise.reject({ message })
      }
    )
  }

  setToken(token: string) {
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

export default new AxiosManager()
