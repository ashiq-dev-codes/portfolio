import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'dfjdl2zn',
    dataset: 'production'
  },
  deployment: {
    // The hosted studio at https://sifna.sanity.studio, so `npm run deploy` doesn't ask again.
    appId: 'm6kjrtwn3mpysqul3ecz77ep',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: false,
  },
})
