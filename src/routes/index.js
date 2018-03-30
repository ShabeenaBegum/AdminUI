import Vue from 'vue'
import Router from 'vue-router'

import dashboard from './dashboard';
import about from './auth';
import common from './common';

Vue.use(Router);
const routes = [].concat(common, dashboard, about);

export default new Router({
    mode: 'history',
    routes
});
