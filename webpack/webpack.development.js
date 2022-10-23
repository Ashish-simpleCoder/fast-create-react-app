const { Configuration } = require('webpack')


/** @param {Configuration} config */
module.exports = (config) => {
    config.mode = 'development',

    config.stats= 'minimal',

    config.cache = {
      type: 'filesystem',
    }


    config.devServer = {
        open: process.env.open || false,
        host: 'localhost',
        port: process.env.PORT || 8080,
        compress: true,
        webSocketServer: 'ws',
        client: {
          webSocketTransport: 'ws',
          webSocketURL: 'auto://0.0.0.0:0/ws'
        }
    }

    config.module.rules = [
        ...config.module.rules,
    ]

    config.plugins = [
        ...config.plugins,
    ]

    return config
}
