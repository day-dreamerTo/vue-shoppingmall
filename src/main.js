// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'

import './assets/css/base.css'
import './assets/css/product.css'
import './assets/css/checkout.css'
import './assets/css/login.css'

Vue.config.productionTip = false

Vue.use(VueLazyLoad,{
  loading: '../static/loading-svg/loading-cylon-red.svg'
});

import infiniteScroll from 'vue-infinite-scroll';
Vue.use(infiniteScroll);

// document.body.scrollTop = '100px'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
