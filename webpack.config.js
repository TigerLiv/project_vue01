const path = require('path');

module.exports = {
    //入口文件
    entry: "./www/app/app.js",
    output: {
        path: path.resolve(__dirname, "www/dist"),
        filename: "bundle.js",
        /*// webpack-dev-server 的虚拟生成的目录，如果不用dev-server 就不用写了
        publicPath: "public"*/
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: [
                path.resolve(__dirname, "node_modules")
            ],
            loader: "babel-loader",
            options: {
                presets: ["env"],
                plugins:["transform-async-to-generator",["transform-runtime",{
                    "helpers":false,
                    "polyfill":true,
                    "regenerator":true
                }]]
            }
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    stylus: 'vue-style-loader!css-loader!stylus-loader',
                }
            }
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    watch : true
}