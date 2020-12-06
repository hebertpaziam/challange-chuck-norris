import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        title: 'Chuck Norris Facts - Home'
      },
      component: Home
    },
    {
      path: '/fact-list',
      name: 'FactList',
      meta: {
        title: 'Chuck Norris Facts - List'
      },

      component: () => import('../views/FactList.vue')
    },
    {
      path: '/fact-details',
      name: 'FactDetails',
      meta: {
        title: 'Chuck Norris Facts - Details'
      },
      component: () => import('../views/FactDetails.vue')
    }
  ]
});

export default router;
