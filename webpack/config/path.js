const path = require('path')
const fs = require('fs')
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const buildPath = process.env.BUILD_PATH || 'build'

const moduleFileExtensions = [
    'js',
    'jsx',
    'ts',
    'tsx',
    'json',
    'web.js',
    'web.mjs',
    'mjs',
    'web.ts',
    'web.tsx',
    'web.jsx',
]
// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find(extension =>
      fs.existsSync(resolveFn(`${filePath}.${extension}`))
    );

    if (extension) {
      return resolveFn(`${filePath}.${extension}`);
    }

    return resolveFn(`${filePath}.js`);
}
const publicUrlOrPath = getPublicUrlOrPath(
    process.env.NODE_ENV === 'development',
    require(resolveApp('package.json')).homepage,
    process.env.PUBLIC_URL
)
const isProduction = process.env.NODE_ENV == 'production'


let env_file_path = ''
if(isProduction){
  const prod_env = fs.existsSync('.env.prod')
  const production_env = fs.existsSync('.env.production')

  if(prod_env && production_env){
    throw new Error('you have .env.prod and .env.production both files, please remove one of them')
  }

  if(!prod_env && !production_env){
    if(fs.existsSync('.env')){
      env_file_path = '.env'
    }
}

  if(prod_env){
    env_file_path = '.env.prod'
  }else if(production_env){
    env_file_path = '.env.production'
  }

}else{
  const dev_env = fs.existsSync('.env.dev')
  const development_env = fs.existsSync('.env.development')

  if(dev_env && development_env){
    throw new Error('you have .env.dev and .env.development both files, please remove one of them')
  }

  if(!dev_env && !development_env){
      if(fs.existsSync('.env')){
        env_file_path = '.env'
      }
  }

  if(dev_env){
    env_file_path = '.env.dev'
  }else if(development_env){
    env_file_path = '.env.development'
  }
}

const All_Paths = {
    appPath: resolveApp('.'),
    appBuild: resolveApp(buildPath),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveModule(resolveApp, 'src/index'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appTsConfig: resolveApp('tsconfig.json'),
    appJsConfig: resolveApp('jsconfig.json'),
    yarnLockFile: resolveApp('yarn.lock'),
    proxySetup: resolveApp('src/setupProxy.js'),
    appNodeModules: resolveApp('node_modules'),
    appWebpackCache: resolveApp('node_modules/.cache'),
    appTsBuildInfoFile: resolveApp('node_modules/.cache/tsconfig.tsbuildinfo'),
    swSrc: resolveModule(resolveApp, 'src/service-worker'),
    publicUrlOrPath,
}

if(env_file_path && env_file_path != ''){
  All_Paths['dotenv'] = resolveApp(env_file_path)
}

module.exports = All_Paths