<template>
  <div>
    <md-layout md-gutter>
      <md-layout></md-layout>

      <md-layout md-flex="50">

        <div style="width: 100%; text-align: center">
          <md-avatar class="md-large">
            <img src="../../assets/youbo-logo.png" alt="Avatar">
          </md-avatar>
        </div>

        <div style="width: 100%; text-align: center">
          <h1>{{userinfo.nickname}}</h1>
        </div>

        <div style="width: 100%; text-align: center">
          <router-link to="/user/settings/profile">
            <md-button class="md-raised">设置</md-button>
          </router-link>
        </div>

        <div style="width: 100%; margin-top: 50px">
          <div v-for="item in tweetList" :key="item.id">
            <TweetItem :tweet="item"></TweetItem>
          </div>
        </div>

      </md-layout>

      <md-layout></md-layout>
    </md-layout>
  </div>
</template>

<script>
  import Axios from 'axios'
  import { USER_API } from '../../common/js/constant'
  import { loadFromLocal, MOCK_ID, USER_INFO_KEY } from '../../common/js/store'
  import TweetItem from '../../components/tweetitem/TweetItem'

  export default {
    data () {
      return {
        userinfo: (() => {
          return loadFromLocal(MOCK_ID, USER_INFO_KEY, null)
        })(),
        tweetList: []
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.getTweetList()
      },
      getTweetList () {
        Axios.get(USER_API + this.userinfo.username + '/tweets')
          .then(response => {
            this.tweetList = response.data.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    components: {
      TweetItem
    }
  }
</script>

<style scoped>
</style>
