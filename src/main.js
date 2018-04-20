import bootstrap from "./bootstrap";
import Vue from 'vue'
import App from './App'
import router from './routes';
import store from '@/store';

import globalComponents from "./globalComponents";

import mixin from "./mixin";
// Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
});
