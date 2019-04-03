const path = require('path')

// const resolve = dir => {
//   return path.join(__dirname, dir)
// }

const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : '/'

module.exports = {
  publicPath: BASE_URL,
  outputDir: 'dist', // 打包的目录
  lintOnSave: true, // 在保存时校验格式
  productionSourceMap: false, // 生产环境是否生成 SourceMap
  devServer: {
    open: true, // 启动服务后是否打开浏览器
    host: '0.0.0.0',
    port: 8080, // 服务端口
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
    before: app => { }
  },

  // configureWebpack: () => ({
  //   resolve: {
  //     alias: {
  //       "@": path.resolve("./src")
  //     }
  //   }
  // }),

  // chainWebpack: config => {
  //   config.plugin("define").tap(args => {
  //     args[0]["process.env"].BASE_URL = JSON.stringify(process.env.BASE_URL);
  //     return args;
  //   });
  // },

}