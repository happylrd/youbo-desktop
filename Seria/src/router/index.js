import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '../views/MainPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MainPage,
      redirect: '/tweets'
    },
    {
      path: '/tweets',
      component: MainPage
    }
  ]
})
