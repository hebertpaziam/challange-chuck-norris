import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'home',
      path: '/',
      meta: {
        title: 'Chuck Norris Facts - Home'
      },
      component: Home
    },
    {
      name: 'fact-list',
      path: '/fact-list',
      props: {
        term: ''
      },
      meta: {
        title: 'Chuck Norris Facts - List'
      },

      component: () => import('../views/FactList.vue')
    },
    {
      name: 'fact-details',
      path: '/fact-details',
      meta: {
        title: 'Chuck Norris Facts - Details'
      },
      component: () => import('../views/FactDetails.vue')
    }
  ]
});

export default router;
