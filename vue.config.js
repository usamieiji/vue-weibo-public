const proxy = require('http-proxy-middleware');

module.exports = {
  publicPath: '/',
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.weibo.com/2',
        secure: false,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/access_token': {
        target: 'https://api.weibo.com/oauth2/access_token',
        secure: false,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/access_token': ''
        }
      },
      // '/video': {
      //   target: 'http://t.cn',
      //   secure: false,
      //   changeOrigin: true,
      //   ws: true,
      //   pathRewrite: {
      //     '^/video': ''
      //   }
      // },
    }
  }
}
