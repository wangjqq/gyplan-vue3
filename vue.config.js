const {
  defineConfig
} = require('@vue/cli-service')
const path = require("path")
const fs = require("fs")
const CompressionPlugin = require('compression-webpack-plugin')
module.exports = defineConfig({

  transpileDependencies: true,
  publicPath: './', //修改目录
  devServer: {
    port: 8080,
    host: 'localhost',
    proxy: 'https://wangjingqi.top:3007', //服务器域名，80端口是默认的，可以不用配置
    // proxy: 'http://localhost:3007', //服务器域名，80端口是默认的，可以不用配置
    https: {
      // 配置证书
      cert: fs.readFileSync(path.join(__dirname, "src/cert/wangjingqi.top_bundle.crt")),
      // 配置证书密钥
      key: fs.readFileSync(path.join(__dirname, "src/cert/wangjingqi.top.key"))
    }
  },
  filenameHashing: true, // 默认在生成的静态资源文件名中包含hash以控制缓存
  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
      return {
        optimization: {
          usedExports: true
        },
        plugins: [new CompressionPlugin({
          test: /\.js$|\.html$|\.css/, //匹配文件名
          threshold: 10240, //对超过10k的数据进行压缩
          deleteOriginalAssets: false //是否删除原文件
        })]
      }
    }
  },

})