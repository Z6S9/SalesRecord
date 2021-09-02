const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 'text-color': '#111',
            // 'border-color': '#eee',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            // hack: `true; @import "your-less-file-path.less";`,
          },
        },
      },
    },
  },
  devServer: {
    port: 3030
  },
  publicPath: './',
  productionSourceMap: false,
  chainWebpack: config => {
      config.resolve.alias
        .set('@', resolve('src'))
        .set('assets', resolve('src/assets'))
        .set('components', resolve('src/components'))
    },
    configureWebpack: (config) => {
      if (process.env.NODE_ENV === 'production') {// 为生产环境修改配置...
        config.mode = 'production';
        config["performance"] = {//打包文件大小配置
          "maxEntrypointSize": 10000000,
          "maxAssetSize": 30000000
        }
      }
    }
};