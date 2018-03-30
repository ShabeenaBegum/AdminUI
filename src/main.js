require('./bootstrap')

import Vue from 'vue'
import App from '@/App'
import router from '@/routes';
import NProgress from 'nprogress';
import Multiselect from 'vue-multiselect'
import authService from '@/services/auth';
// import Meta from 'vue-meta';
window.baseUrl = "http://apigatewaymock.test/api";
window.log = function (message) {
    console.log(message);
};
if (authService.check()) {
    window.axios.defaults.headers.common['Authorization'] = "Bearer "+authService.getToken();
}
window.axios.interceptors.request.use(function (config) {
    NProgress.start();
    return config;
}, function (error) {
    log(error);
    return Promise.reject(error);
});
window.axios.interceptors.response.use(function (response) {
    NProgress.done();
    return response;
}, function (error) {
    log(error);
    return Promise.reject(error);
});

// Vue.use(Meta);
window.eventHub = new Vue()
window.flash = function (message, type = 'success') {
    window.eventHub.$emit('flash', {'message': message, 'type': type})
}
router.beforeEach(function (to, from, next) {
    NProgress.start();
    next();
});

router.afterEach(function () {
    NProgress.done();
});
import Example from '@/components/Example';
import Flash from '@/components/Flash';
import dataFilter from '@/components/dataFilter';
import dataGrid from '@/components/dataGrid';

Vue.component('multiselect', Multiselect)
Vue.component('example-component', Example);
Vue.component('flash', Flash);
Vue.component('data-filter', dataFilter);
Vue.component('data-grid', dataGrid);

Vue.mixin({
    data(){
        return {
            eventHub: window.eventHub,
            authCheck: authService.check(),
            authUser: authService.getAuthUser(),
            baseUrl: window.baseUrl
        }
    },
    methods:{
    }
});
// Vue.config.productionTip = false
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
