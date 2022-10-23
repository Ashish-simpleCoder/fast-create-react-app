const common_configs = require("./webpack/webpack.common")


const mode = process.env.NODE_ENV
console.log({mode})

const dynamicConfigsRequired = require(`./webpack/webpack.${mode}`)

module.exports = () => ({
   ...common_configs,
   ...dynamicConfigsRequired(common_configs)
})