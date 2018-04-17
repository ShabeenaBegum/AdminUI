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
import sweetalert from "sweetalert";


window.swal = sweetalert;
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
    nativeToast({
        message: 'Ajax Request Failed!!',
        position: 'bottom',
        type: 'error',
        edge: true
    });
    return Promise.reject(error);
});

window.axios.interceptors.response.use(function (response) {
    NProgress.done();
    log("response");
    return response;
}, function (error) {
    NProgress.done();
    log(error);
    nativeToast({
        message: 'Ajax Response Failed!!',
        position: 'bottom',
        type: 'error',
        edge: true
    });
    return Promise.reject(error);
});

// Vue.use(Meta);
window.eventHub = new Vue();

window.flash = function (message, type = 'success') {
    window.eventHub.$emit('flash', {'message': message, 'type': type})
};

window.sflash = function (message, type = 'success') {
    swal({ icon: type, title: message, text: " ", button: false, timer: 1500});
};
function genUUID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + s4() + '-' + s4() + s4() +'-'+Date.now();
}

if (authService.check()) {
    window.axios.defaults.headers.common['Authorization'] = "Bearer " + authService.getToken();
}

router.beforeEach(function (to, from, next) {
    window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    window.axios.defaults.headers.common['X-Ag-Request-Id'] = genUUID();
    try{NProgress.start()}catch (e) {log("nprogress failed")};
    next();
});

router.afterEach(function () { NProgress.done(); });

Vue.use(VueTippy, {
    placement: 'bottom',
    arrow: true
});