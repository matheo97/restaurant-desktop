import { app, autoUpdater, dialog } from 'electron'
import axios from 'axios'

const updateServerInstance = axios.create({
  baseURL: process.env.UPDATE_SERVER_URL,
  timeout: 15000,
})

const checkForLatestVersion = async () => {
  try {
    const { data } = await updateServerInstance.get(
      `/releases/update/${process.platform}/${app.getVersion()}`
    )
    return data
  } catch (error) {
    console.error('Auto updater: ', error)
    return null
  }
}

const startAutoUpdater = async () => {
  autoUpdater.addListener(
    'update-downloaded',
    (_event, releaseNotes, releaseName) => {
      const dialogOpts = {
        type: 'info',
        buttons: ['Restart', 'Later'],
        title: 'Update Pending',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail:
          'A new version of the app has been downloaded. Please restart now to complete the update.',
      }

      dialog.showMessageBox(dialogOpts).then(returnValue => {
        if (returnValue.response === 0) autoUpdater.quitAndInstall()
      })
    }
  )

  autoUpdater.addListener('error', error => {
    console.error('Auto updater: ', error)
  })

  const data = await checkForLatestVersion()
  if (data) {
    autoUpdater.setFeedURL({ url: data.updateTo.url })
    autoUpdater.checkForUpdates()
  }
}

app.on('ready', function () {
  // Commented until upload server is implemented
  //startAutoUpdater()
})
