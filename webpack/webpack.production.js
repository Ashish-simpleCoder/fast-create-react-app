const { Configuration, ProgressPlugin } = require('webpack')


/** @param {Configuration} config */
module.exports = (config) => {
    config.mode = 'production'

    // pushing production plugins
    config.plugins = [
        ...config.plugins,


        // @ts-ignore
        new ProgressPlugin(),

    ]

    // production optimisations
    config.optimization = {
        ...config.optimization,
        minimize: true,
    }

    config.performance = false


    return config
}
