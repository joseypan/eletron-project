import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: require('@/views/Login').default
    },
    {
      path: '/main',
      name: 'Main',
      component: () => import('@/views/Main.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/views/Home.vue')
        },
        {
          path: '/alarm',
          name: 'Alarm',
          component: () => import('@/views/Alarm.vue')
        },
        {
          path: '/report',
          name: 'Report',
          component: () => import('@/views/Report.vue')
        },
        {
          path: '/keywords',
          name: 'Keywords',
          component: () => import('@/views/Keywords.vue')
        }
      ]
    }
  ]
})
