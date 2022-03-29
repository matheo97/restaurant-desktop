import PublisherBase from '@electron-forge/publisher-base'
import FormDataModule from 'form-data'
import { createReadStream } from 'fs'
import { request } from 'https'

type Config = {
  name: string
  notes: string
}

class CustomPublisher extends PublisherBase<Config> {
  name = 'restaurant'

  async publish({ makeResults }) {
    const { config } = this
    const artifacts = []

    for (const makeResult of makeResults) {
      artifacts.push(
        ...makeResult.artifacts.map(artifact => ({
          path: artifact,
          platform: makeResult.platform,
          arch: makeResult.arch,
          version: makeResult.packageJSON.version,
        }))
      )
    }

    const upload = () => {
      const promises = artifacts.map(
        artifact =>
          new Promise((resolve, reject) => {
            const form = new FormDataModule()
            form.append('name', config.name)
            form.append('notes', config.notes)
            form.append('file', createReadStream(artifact.path))
            const req = request(process.env.UPDATE_SERVER_URL, {
              method: 'post',
              path: `/upload/${artifact.platform}/${artifact.version}`,
              headers: form.getHeaders(),
            })
            form.pipe(req)
            req.on('error', reject)
            req.on('response', resolve)
          })
      )

      return Promise.all(promises)
    }
    await upload()
  }
}

export default CustomPublisher
