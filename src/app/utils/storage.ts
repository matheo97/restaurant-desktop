export class Storage {
  set<T>(key: string, value: T) {
    // window.ipc.invoke('storage-set', { key, value: JSON.stringify(value) })
    localStorage.setItem(key, JSON.stringify(value))
  }
  get<T>(key: string): T {
    // const data = await window.ipc.invoke('storage-get', key)
    return JSON.parse(localStorage.getItem(key))
  }
}

export default new Storage()
