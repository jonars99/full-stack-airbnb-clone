const { environment } = require('@rails/webpacker')

const path = require('path')

const customConfig = {
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '..', '..', 'app/javascript/src'),
      '@utils': path.resolve(__dirname, '..', '..', 'app/javascript/src/utils'),
    }
  }
}

environment.config.merge(customConfig);

environment.splitChunks()

const webpack = require('webpack')
const dotenv = require('dotenv')
const dotenvFiles = [
  `.env.${process.env.NODE_ENV}.local`,
  '.env.local',
  `.env.${process.env.NODE_ENV}`,
  '.env'
]
dotenvFiles.forEach((file) => {
  dotenv.config({ path: file, silent: true })
})

environment.plugins.prepend('Environment', new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(process.env))))

module.exports = environment
