const path = require('path'); // для корректного поиска путей на кроссплатформах
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // для подключения css в index.js
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const { VueLoaderPlugin } = require('vue-loader');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const PATHS = { // глобальная константа
    src: path.join(__dirname,'../src'),
    dist: path.join(__dirname,'../dist'),
    assets: 'assets/'
}

module.exports = {
    externals: { // для получения доступа к вышестоящей константе PATHS для других конфигов
        paths: PATHS
    },
    // точка входа
    entry: {
        app: PATHS.src,
        lk: `${PATHS.src}/lk.js` // напр., личный кабинет
    },
    // точка выхода
    output: {
        filename: `${PATHS.assets}js/[name].[hash].js`, // будет app.js
        path: PATHS.dist,
        publicPath: '/' // для devservera
    },
    // для разделения js-файлов (напр., vendor.js, app.js, lk.js, ...)    
    // https://tproger.ru/translations/configure-webpack4/
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    // loaders
    module: { 
        rules: [ // правила (массив объектов)
            { 
                test: /\.(png|jpe?g|gif|woff2?)$/, // обращаемся ко всем изображениям и шрифтам
                loaders: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.svg$/,
                use: [
                {
                    loader: "svg-sprite-loader",
                    options: {
                    extract: true,
                    //spriteFilename: svgPath => `sprite${svgPath.substr(-4)}`
                    }
                },
                "svg-transform-loader",
                {
                    loader: "svgo-loader",
                    options: {
                    plugins: [
                        { removeTitle: true },
                        {
                        removeAttrs: {
                            attrs: "(fill|stroke)"
                        }
                        }
                    ]
                    }
                }
                ]
            },        
            { 
                test: /\.js$/, // обращаемся ко всем js файлам
                loaders: 'babel-loader',
                exclude: '/node_modules/' // исключаем папку node_modules
            },
            { 
                test: /\.vue$/, // обращаемся ко всем vue файлам
                loaders: 'vue-loader',
                options: {
                    loader: {
                        scss: 'vue-style-loader!css-loader!sass-loader'
                    }
                }
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
                                path: `${PATHS.src}/js/postcss.config.js`
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
                                path: `${PATHS.src}/js/postcss.config.js`
                            } 
                        }
                    }
                ]
            }
        ]
    },
    resolve: {        
        alias: { // для сокращения в вызовах 
            'vue$': 'vue/dist/vue.js' // vue заменится на vue/dist/vue.js
        }
    },
    // зарегистрируем используемые плагины
    plugins: [ 
        new CleanWebpackPlugin(), // очистка output.path
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[hash].css` // на выходе будет app.css
        }),
        new HtmlWebpackPlugin({
            // https://github.com/jaketrent/html-webpack-template/blob/legacy/index.html
            template: `${PATHS.src}/index.html`,
            filename: './index.html',
            inject: false // отключает автоматическую вставку css (linkrel в head) и js (script вниз body)
        }),
        new CopyWebpackPlugin([
            {
                from: `${PATHS.src}/img`,
                to: `${PATHS.assets}img`
            },
            {
                from: `${PATHS.src}/static`,
                to: ''
            }
        ]),
        new SpriteLoaderPlugin({ 
            plainSprite: true 
        }),
        new VueLoaderPlugin()
    ]
}