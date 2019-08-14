const path = require('path'); // для корректного поиска путей на кроссплатформах
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // для подключения css в index.js

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
        rules: [ // правила (массив объектов)
        { 
            test: /\.js$/, // обращаемся ко всем js файлам
            loaders: 'babel-loader',
            exclude: '/node_modules/' // исключаем папку node_modules
        },
        {
            test: /\.scss$/, // обработка scss
            use: [
                "style-loader",
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {sourceMap: true}
                },
                {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true, 
                        config: {
                            path: 'src/js/postcss.config.js'
                        } 
                    }
                },
                {
                    loader: "sass-loader",
                    options: {sourceMap: true}
                }
                
            ]
        },
        {
            test: /\.css$/, // обработка css
            use: [
                "style-loader",
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {sourceMap: true}
                },
                {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true, 
                        config: {
                            path: 'src/js/postcss.config.js'
                        } 
                    }
                }
            ]
        }
    ]
    },
    // настройка devserver
    devServer: {
        overlay: true
    },
    // зарегистрируем используемые плагины
    plugins: [ 
        new MiniCssExtractPlugin({
            filename: '[name].css' // на выходе будет app.css
        })
    ]
}