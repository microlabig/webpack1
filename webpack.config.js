const path = require('path'); // для корректного поиска путей на кроссплатформах

module.exports = {
    // точка входа
    entry: {
        app: './src/index.js'
    },
    // точка выхода
    output: {
        filename: '[name].js', // будет app.js
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist' // для devservera
    },
    // настройка devserver
    devServer: {
        overlay: true
    }
}