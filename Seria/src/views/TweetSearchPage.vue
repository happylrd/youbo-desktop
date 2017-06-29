<template>
  <div>
    <div style="text-align: center" v-if="isLoading">
      <md-spinner md-indeterminate class="md-accent"></md-spinner>
    </div>

    <md-layout md-gutter v-if="!isLoading">
      <md-layout></md-layout>

      <md-layout md-flex="50">

        <div style="width: 100%">
          <div v-for="item in tweetList" :key="item.id">
            <TweetItem :tweet="item"></TweetItem>
          </div>
        </div>

      </md-layout>

      <md-layout></md-layout>
    </md-layout>

    <div style="text-align: center" v-if="isShowNotFound">什么都没找到...</div>
  </div>
</template>

<script>
  import { searchTweet } from '../api/tweet'
  import { ERR_OK, DELAY_TIME } from '../api/config'
  import TweetItem from '../components/tweetitem/TweetItem'

  export default {
    data () {
      return {
        isLoading: false,
        tweetList: []
      }
    },
    computed: {
      isShowNotFound () {
        return !this.isLoading && this.tweetList.length === 0
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      _searchTweet () {
        searchTweet(this.$route.query.content)
          .then(res => {
            if (res.code === ERR_OK) {
              this.isLoading = false
              this.tweetList = res.data
            }
          })
      },
      fetchData () {
        this.isLoading = true
        // TODO:just mock loading, will be removed later
        setTimeout(this._searchTweet, DELAY_TIME)
      }
    },
    components: {
      TweetItem
    }
  }
</script>

<style scoped>
</style>
