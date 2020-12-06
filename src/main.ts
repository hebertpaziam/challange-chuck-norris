import './registerServiceWorker';

import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || 'Chuck Norris Facts';
      }
    }
  },
  render: (h) => h(App)
}).$mount('#app');
