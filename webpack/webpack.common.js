// @ts-nocheck
const fs = require('fs')
const path = require('path')
const paths = require('./config/path')
const resolve = require('resolve');
const { loader: MiniCssExtractPluginLoader } = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const { ProvidePlugin } = require('webpack')
const modules = require('./config/modules')
const GLOBAL_CONFIGS = require("../GLOBAL_CONFIG")


let ForkTsCheckerWebpackPlugin
if (GLOBAL_CONFIGS.TS_CHECKER_IN_RUNTIME) {
    ForkTsCheckerWebpackPlugin =
        GLOBAL_CONFIGS.TSC_COMPILE_ON_ERROR
            ?
            require('react-dev-utils/ForkTsCheckerWarningWebpackPlugin')
            :
            require('react-dev-utils/ForkTsCheckerWebpackPlugin');
}

// getting the environment mode
const isProduction = process.env.NODE_ENV == 'production'


// getting css extractor in production mode
const stylesHandler = isProduction ? MiniCssExtractPluginLoader : 'style-loader'


// getting the absolute path -> utililty functions
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)




/** @type {Configuration} */
const commonConfig = {
    target: ['browserslist'],

    entry: resolveApp('src'),


    // source map for catching the errors where they occurs
    // like the file-name, line-number where the error occured.
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map',


    output: {
        path: resolveApp('build'),
        filename: 'static/js/[name].[contenthash:8].js',
        chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
        clean: true,
        crossOriginLoading: 'anonymous',
    },


    optimization: {
        runtimeChunk: 'single',
        moduleIds: 'deterministic',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },


    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        modules: [
            resolveApp('src'), 'node_modules'
        ],
        alias: {
            ...(modules.webpackAliases)
        }
    },


    plugins: [
        // setting the support of .env files in react app and also providing the support of process.env.
        new Dotenv({
            path: paths.dotenv
        }),


        // Read the article for creating custom template
        // https://github.com/jantimon/html-webpack-plugin
        new HtmlWebpackPlugin({
            cache: true,
            hash: true,
            inject: true,
            template: paths.appHtml,
            minify: isProduction ? ({
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
                sortClassName: true,
                sortAttributes: true,
            }) : undefined
        }),


        // making React accessible everywhere in code without being declared or import
        // making it global
        new ProvidePlugin({
            React: 'react',
        }),


        // validating typescript code in runtime
        GLOBAL_CONFIGS.TYPESCRIPT
            &&
            new ForkTsCheckerWebpackPlugin({
                async: !isProduction,
                typescript: {
                    typescriptPath: resolve.sync('typescript', {
                        basedir: paths.appNodeModules,
                    }),
                    configOverwrite: {
                        compilerOptions: {
                            sourceMap: !isProduction && GLOBAL_CONFIGS.SHOULD_USE_SOURCE_MAP,
                            skipLibCheck: true,
                            inlineSourceMap: false,
                            declarationMap: false,
                            noEmit: true,
                            incremental: true,
                            tsBuildInfoFile: paths.appTsBuildInfoFile,
                        },
                    },
                    context: paths.appPath,
                    diagnosticOptions: {
                        syntactic: true,
                    },
                    mode: 'write-references',
                    // profile: true,
                },
                issue: {
                    include: [
                        { file: '../**/src/**/*.{ts,tsx}' },
                        { file: '**/src/**/*.{ts,tsx}' },
                    ],
                    exclude: [
                        { file: '**/src/**/__tests__/**' },
                        { file: '**/src/**/?(*.){spec|test}.*' },
                        { file: '**/src/setupProxy.*' },
                        { file: '**/src/setupTests.*' },
                    ],
                },
                logger: {
                    infrastructure: 'silent',
                },
            }),

    ].filter(Boolean),


    module: {
        rules: [
            //  js loader
            {
                test: /\.(js|ts)x$/,    // advanced regex pattern of above logic
                loader: 'babel-loader',
                include: paths.appSrc,
                exclude: /node_modules/
            },

            // styles/css loader
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader'], //can also give object as elements,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'sass-loader']
            },


            // images loaders
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]'
                }
            },


            // font loader
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            }

        ]
    }
}

module.exports = commonConfig