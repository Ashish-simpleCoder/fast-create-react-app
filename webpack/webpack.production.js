const { Configuration, ProgressPlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const {WebpackManifestPlugin} = require('webpack-manifest-plugin')



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
        new CssMinimizerPlugin(),


        // generating manifest file in prouction mode
        new WebpackManifestPlugin({
            fileName: 'asset-manifest.json',
            publicPath: '/build',
            generate: (seed, files, entrypoints) => {
                const manifestFiles = files.reduce((manifest, file) => {
                    manifest[file.name] = file.path;
                    return manifest;
                }, seed);
                const entrypointFiles = entrypoints.main.filter(
                    fileName => !fileName.endsWith('.map')
                );

                return {
                    files: manifestFiles,
                    entrypoints: entrypointFiles,
                }
            },
        }),

    ]

    // production optimisations
    config.optimization = {
        ...config.optimization,
        minimize: true,
    }

    config.performance = false


    return config
}
