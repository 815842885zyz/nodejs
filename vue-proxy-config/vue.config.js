module.exports = {
  devServer: {
    proxy: {
      '/integra': {
        target: 'http://127.0.0.1:9000',
        changeOrigin: true, //是否跨域
        ws: true,
        pathRewrite: {
          '^/integra': '/'
        }
      }
    }
  }
}
