import axios from './axios'
import { ipcMain } from 'electron'

ipcMain.handle(
  'authenticate',
  async (
    _,
    { token }: { token: string }
  ) => {
    axios.setToken(token)
  }
)

export default axios
