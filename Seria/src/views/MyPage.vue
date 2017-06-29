<template>
  <div>
    <md-layout md-gutter>
      <md-layout></md-layout>

      <md-layout md-flex="50">

        <div style="width: 100%; text-align: center">
          <md-avatar class="md-large">
            <img src="../common/image/avatar.png" alt="Avatar">
          </md-avatar>
        </div>

        <div style="width: 100%; text-align: center">
          <h1>{{user.nickname}}</h1>
        </div>

        <div style="width: 100%; text-align: center">
          <router-link to="/user/settings/profile">
            <md-button class="md-raised">设置</md-button>
          </router-link>
        </div>

        <div style="width: 100%; margin-top: 50px">
          <div v-for="item in tweetList" :key="item.id">
            <router-link :to="'/tweets/' + item.id">
              <TweetItem :tweet="item"></TweetItem>
            </router-link>
          </div>
        </div>

      </md-layout>

      <md-layout></md-layout>
    </md-layout>
  </div>
</template>

<script>
  import { listMyTweet } from '../api/user'
  import { ERR_OK } from '../api/config'
  import { loadFromLocal, MOCK_ID, USER_INFO_KEY } from '../common/js/store'
  import TweetItem from '../components/tweetitem/TweetItem'

  export default {
    data () {
      return {
        user: (() => {
          return loadFromLocal(MOCK_ID, USER_INFO_KEY, null)
        })(),
        tweetList: []
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      _listMyTweet () {
        listMyTweet(this.user.username)
          .then(res => {
            if (res.code === ERR_OK) {
              this.tweetList = res.data
            }
          })
      },
      fetchData () {
        this._listMyTweet()
      }
    },
    components: {
      TweetItem
    }
  }
</script>

<style scoped>
</style>
