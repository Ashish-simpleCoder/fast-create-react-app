const fs = require('fs')
const path = require('path')
const paths = require('./path')
const resolve = require('resolve')


function getWebpackAliases(options = {}) {
    const baseUrl = options.baseUrl

    if (!baseUrl) return {}

    const baseUrlResolved = path.resolve(paths.appPath, baseUrl)


    let path_alias_obj = {}

    Object.keys(options.paths).forEach((key) => {
      const sliced_string = key.slice(0, key.indexOf('/'))
      const sliced_path = (options.paths[key][0]).slice(0, (options.paths[key][0]).indexOf('/*'))

      // path_alias[sliced_string] = path.resolve(paths.appSrc, options.paths[key][0])
      path_alias_obj[sliced_string] = path.resolve(paths.appSrc, sliced_path)
    })

    if (path.relative(paths.appPath, baseUrlResolved) === '') {
      return {
        src: paths.appSrc,
        ...path_alias_obj
      };
    }
    return {
      src: paths.appSrc,
      ...path_alias_obj
    };
}



function getModules() {
    // Check if TypeScript is setup
    const hasTsConfig = fs.existsSync(paths.appTsConfig)

    // Check if only js is setup
    const hasJsConfig = fs.existsSync(paths.appJsConfig)


    if (hasTsConfig && hasJsConfig) {
      throw new Error( 'You have both a tsconfig.json and a jsconfig.json. If you are using TypeScript please remove your jsconfig.json file.' );
    }


    let config = {};

    if (hasTsConfig) {
      const ts = require(resolve.sync('typescript', {
        basedir: paths.appNodeModules,
      }))
      config = ts.readConfigFile(paths.appTsConfig, ts.sys.readFile).config
    } else if (hasJsConfig) {
      config = require(paths.appJsConfig)
    }

    if(!config){
      config = {}
    }

    // @ts-ignore
    const options = config.compilerOptions || {}

    return {
      webpackAliases: getWebpackAliases(options) || {},
      hasTsConfig,
    }
}

module.exports = getModules()