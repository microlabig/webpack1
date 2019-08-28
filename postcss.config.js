// npm install postcss-loader autoprefixer css-mqpacker cssnano postcss-pxtorem postcss-inline-svg --save-dev

module.exports = {
    plugins: [
        require('autoprefixer'), // автопрефиксер
        require('css-mqpacker'), // группировка всех одинаковых медиазапросов 
        require('postcss-inline-svg')({ // инлайновые svg
            removeFill: true,
            paths: ["./src/assets/img/icons/"]
        }),
        require('cssnano') ({ // уменьшение css
            preset: [
                'default', {
                    discardComments: { 
                        removeAll: true // удаление комментариев
                    }
                }
            ]
        }),
        require('postcss-pxtorem')({ // px2rem
            rootValue: 16,
            propList: ["*", "!*border*"],
            selectorBlackList: [/^html$/]
        })
    ]
}