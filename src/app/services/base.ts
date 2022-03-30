import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 15000,
})

instance.interceptors.response.use(
  response => response,
  async error => {
    console.log({ error })
    const { message: defaultMessage, response } = error
    let message = 'Algo anda mal'
    if (response && response.data) {
      message = response.data.message || response.data.error || defaultMessage
      if (Array.isArray(message)) {
        message = message.join('\n')
      }
    }
    return Promise.reject({ message })
  }
)

export default instance
