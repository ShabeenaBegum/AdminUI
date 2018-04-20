import bootstrap from "./bootstrap";
import Vue from 'vue'
import App from './App'
import router from './routes';

import globalComponents from "./globalComponents";

import mixin from "./mixin";
// Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
});
