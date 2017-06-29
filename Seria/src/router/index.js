import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '../views/MainPage'
import TweetDetail from '../views/TweetDetail'

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
    },
    {
      path: '/tweets/:id',
      component: TweetDetail
    }
  ]
})
