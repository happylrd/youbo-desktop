import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '../views/MainPage'
import TweetDetail from '../views/TweetDetail'
import TweetSearchPage from '../views/TweetSearchPage'
import MyPage from '../views/MyPage'

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
    },
    {
      path: '/search',
      component: TweetSearchPage
    },
    {
      path: '/user/main',
      component: MyPage
    }
  ]
})
