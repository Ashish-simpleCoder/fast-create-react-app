const { Configuration, ProgressPlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')


/** @param {Configuration} config */
module.exports = (config) => {
    config.mode = 'production'

    // pushing production plugins
    config.plugins = [
        ...config.plugins,


        // @ts-ignore
        new ProgressPlugin(),


        // css optimization plugins
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
        }),
        new CssMinimizerPlugin()

    ]

    // production optimisations
    config.optimization = {
        ...config.optimization,
        minimize: true,
    }

    config.performance = false


    return config
}
