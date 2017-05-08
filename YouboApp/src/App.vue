<template>
  <div class="navbar-fixed-top-wrapper">

    <!-- TODO: `z-index` is strongly dependent on `vue-material` framework, will be improved later -->
    <div class="navbar-fixed-top" style="width: 100%; z-index: 6">
      <Header></Header>
    </div>

    <keep-alive>
      <router-view :tweetList="tweetList"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Axios from 'axios'
  import Header from './components/header/Header'
  import { TWEET_API } from './common/js/constant'

  export default {
    data () {
      return {
        tweetList: []
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        Axios.get(TWEET_API)
          .then(response => {
            this.tweetList = response.data.data
            console.log(this.tweetList)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    components: {
      Header
    }
  }
</script>

<style scoped>
  .navbar-fixed-top-wrapper {
    padding-top: 70px
  }

  .navbar-fixed-top {
    position: fixed;
    top: 0;
    height: 50px
  }
</style>
