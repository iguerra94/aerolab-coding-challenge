import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }
  ],
  mode: 'history'
})

export default router