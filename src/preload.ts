import {
	contextBridge,
	ipcRenderer
} from 'electron'

contextBridge.exposeInMainWorld('ipc', {
	send: ipcRenderer.send,
	invoke: ipcRenderer.invoke,
	receive: ipcRenderer.on
})

declare global {
	interface Window {
		ipc: typeof ipcRenderer
	}
}