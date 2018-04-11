import Vue from "vue";
import Flash from './components/flash';
import dataFilter from './components/dataFilterr';
import dataGrid from './components/dataGrid';
import VeeValidate from 'vee-validate';
import Multiselect from 'vue-multiselect'

Vue.component('multiselect', Multiselect);
Vue.component('flash', Flash);
Vue.component('data-filter', dataFilter);
Vue.component('data-grid', dataGrid);
Vue.use(VeeValidate, {classes: true, classNames: { invalid: 'is-invalid'}});
