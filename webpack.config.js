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
    // loaders
    module: { 
        rules: [{ // правила (массив объектов)
            test: /\.js$/, // обращаемся ко всем js файлам
            loaders: 'babel-loader',
            exclude: '/node_modules/' // исключаем папку node_modules
        }]
    },
    // настройка devserver
    devServer: {
        overlay: true
    }
}