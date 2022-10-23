const { Configuration } = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')


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

        // adding hot loader support in development only
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                plugins: [require.resolve('react-refresh/babel')],
              },
            },
          ]
      }
    ]



    config.plugins = [
        ...config.plugins,

        new ReactRefreshWebpackPlugin()
    ]

    return config
}
