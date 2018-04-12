import nativeToast from "native-toast";
import Vue from "vue";
import NProgress from "nprogress";
import authService from "@/services/auth";
import router from "@/routes";
import lodash from "lodash";
import jquery from "jquery";
import bootstrap from "bootstrap";
import axios from "axios";
import moment from "moment";
import VueTippy from 'vue-tippy';


window._ = lodash;
try {
  window.$ = window.jQuery = jquery;
} catch (e) {}

window.axios = axios;
window.moment = moment;

window.baseUrl = "http://apigatewaymock.test/api";
window.contentUrl = "http://content.acadgild.co.in/api";
window.batchUrl = "http://batch-points.acadgild.co.in/api";
window.studentUrl = "http://user.acadgild.co.in/api";
window.pointsUrl = "http://user.acadgild.co.in/api";

window.log = function (message) {
    console.log(message);
};

window.axios.interceptors.request.use(function (config) {
    NProgress.start();
    return config;
}, function (error) {
    log(error);
    NProgress.done();
    return Promise.reject(error);
});

window.axios.interceptors.response.use(function (response) {
    NProgress.done();
    return response;
}, function (error) {
    NProgress.done();
    nativeToast({
        message: 'Ajax Call Failed!!',
        position: 'bottom',
        type: 'error',
        edge: true
    });
    log(error);
    return Promise.reject(error);
});

// Vue.use(Meta);
window.eventHub = new Vue();

window.flash = function (message, type = 'success') {
    window.eventHub.$emit('flash', {'message': message, 'type': type})
};

if (authService.check()) {
    window.axios.defaults.headers.common['Authorization'] = "Bearer " + authService.getToken();
}

router.beforeEach(function (to, from, next) {
    NProgress.start();
    next();
});

router.afterEach(function () {
    NProgress.done();
});

Vue.use(VueTippy);