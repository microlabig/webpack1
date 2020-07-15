const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    // настройка devserver
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.dist, // где будет открываться webpack
        port: 8081, // 8080 - м.б. сервером PHP и т.д.
        overlay: true,
        // historyApiFallback: true, // true - при переходе на несуществующую страницу, переходим на index.html
        // noInfo: false, // false - показывать информацию как при успешной, так и при ошибочной сборке проекта, true - показывать только ошибки
    },
    plugins: [
        // для макс. корректной работы карты сайта
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
});

module.exports = new Promise( (resolve, reject) => {
    resolve(devWebpackConfig);
});

