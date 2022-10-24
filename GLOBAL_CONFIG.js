const mode = process.env.NODE_ENV
const port = process.env.PORT

module.exports = {
    PORT: port || 4000,
    TS_CHECKER_IN_RUNTIME: true,
    TYPESCRIPT: true,
    TSC_COMPILE_ON_ERROR: false,
}