// npm install postcss-loader autoprefixer css-mqpacker cssnano --save-dev

module.exports = {
    plugins: [
        require('autoprefixer'), // автопрефиксер
        require('css-mqpacker'), // группировка всех одинаковых медиазапросов        
        require("postcss-pxtorem")({ // px2rem
            rootValue: 16,
            propList: ["*", "!*border*"],
            selectorBlackList: [/^html$/]
        }),
        /* require("postcss-inline-svg")({ // инлайновые svg
            removeFill: true,
            path: "./src/images/icons"
        }), */
        require('cssnano') ({ // уменьшение css
            preset: [
                'default', {
                    discardComments: { 
                        removeAll: true // удаление комментариев
                    }
                }
            ]
        }),
    ]
}