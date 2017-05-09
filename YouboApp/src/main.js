// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

import App from './App'
import TweetDetail from './components/tweetdetail/TweetDetail'
import MainPage from './pages/mainpage/MainPage'
import MyPage from './pages/mypage/MyPage'
import ProfilePage from './pages/profilepage/ProfilePage'
import TweetSearchPage from './pages/tweetsearchpage/TweetSearchPage'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueMaterial)

Vue.material.registerTheme('default', {
  primary: 'cyan'
})

const routes = [
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
  },
  {
    path: '/user/settings/profile',
    component: ProfilePage
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
