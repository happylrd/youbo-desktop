<template>
  <div>
    <Header></Header>

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
      Axios.get(TWEET_API)
        .then(response => {
          this.tweetList = response.data.data
          console.log(this.tweetList)
        })
        .catch(error => {
          console.log(error)
        })
    },
    components: {
      Header
    }
  }
</script>

<style scoped>

</style>
