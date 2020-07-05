module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      scss: {
        sourceMap: false,
        prependData: '@import "~@/assets/css/index.scss";'
      }
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/mealtime-explorer/'
    : '/'
}
