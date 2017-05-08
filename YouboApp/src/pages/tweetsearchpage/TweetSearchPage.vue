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
  </div>
</template>

<script>
  import Axios from 'axios'
  import { SEARCH_TWEET_API } from '../../common/js/constant'
  import TweetItem from '../../components/tweetitem/TweetItem'

  export default {
    data () {
      return {
        isLoading: false,
        tweetList: []
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.isLoading = true
        console.log(this.isLoading)

        // TODO:just mock loading, will be removed later
        setTimeout(this.getTweetList, 2000)
      },
      getTweetList () {
        Axios.get(SEARCH_TWEET_API + this.$route.query.content)
          .then(response => {
            this.isLoading = false

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
