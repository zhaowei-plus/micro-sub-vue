const { resolve } = require('path')
const { name } = require('./package.json')

// TODO name 路径一般都是小写

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
    // 关闭主机检查，使微应用可以被 fetch
    // disabledHostCheck: true,
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: isDevelopment,
    productionSourceMap: false,
    // 确保子应用静态资源是在 1001 上发送的，需要根据不同环境配置不同的资源地址
    // publicPath: '//localhost:1001',
    publicPath: isDevelopment ? '/' : `/${name}/`,

    configureWebpack: {
        name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        output: {
            library: `${name}`,
            libraryTarget: 'umd',
            jsonpFunction: `webpackJsonp_${name}`,
        }
    },

    devServer: {
        port: process.env.PORT,
        open: true,
        hot: true,
        hotOnly: true,
        overlay: {
            warning: false,
            errors: true
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            '/auth': {
                target: 'www.baidu.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/auth': 'auth'
                }
            }
        }
    }
}