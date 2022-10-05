const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin')

module.exports = {
    entry: "./public/main.js",                      //entrypoint for webpack
    output: {
        path: path.resolve(__dirname, 'dist'),      //destination for webpack, resolved using path package and relative path
        filename: 'index.js'             
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",         //html plugin and path to pre-esting html-template
        }),
        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, '.')
        })
    ],
    experiments: {
        asyncWebAssembly: true                      //activate experimental webaassembly feature
    }
}