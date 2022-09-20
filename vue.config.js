const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './', //修改目录
  devServer: {
    // proxy: 'http://127.0.0.1:3007' //服务器域名，80端口是默认的，可以不用配置
    proxy: 'http://119.91.65.198:3000' //服务器域名，80端口是默认的，可以不用配置
  }
})