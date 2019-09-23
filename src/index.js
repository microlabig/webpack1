// ---------------------------
// основной файл (точка входа)
// ---------------------------

// JS
import './js/common';

// CSS
import 'normalize.css';
import './assets/css/main.css';

// SCSS
import './assets/scss/main.scss';

// способы импортирования vue.js:
// 1
// import 'vue';

// 2
import store from './store';

window.Vue = require('vue');

Vue.component('example-component', require('./components/Example.vue').default);

const app = new Vue({
    el: "#app",
    store,
    data() {
        return {
            component: false
        }
    },
    methods: {
        showComponent() {
            this.component = !this.component;
        }
    }
});

// 3
/* import Vue from 'vue';

import store from './store';

import Example from './components/Example.vue';

new Vue({
    el: '#app',
    store,    
    data() {
        return {
            component: false
        }
    },
    methods: {
        showComponent() {
            this.component = !this.component;
        }
    },
    render: h => h(Example)
}); */

/*
console.log($);
console.log(jQuery);
*/
