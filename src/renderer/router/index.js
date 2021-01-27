import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: require('@/views/Home').default
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
})
