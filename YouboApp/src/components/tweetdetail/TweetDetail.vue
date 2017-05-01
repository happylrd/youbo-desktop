<template>
  <div>

    <md-layout md-gutter>
      <md-layout></md-layout>

      <md-layout md-flex="50">
        <div style="width: 100%">

          <md-card md-with-hover>

            <md-card-header>
              <md-avatar>
                <img src="../../assets/youbo-logo.png" alt="Avatar">
              </md-avatar>

              <div class="md-title">Username</div>
              <div class="md-subhead">2017/01/01</div>
            </md-card-header>

            <md-card-media>
              <img src="../../assets/tweet-image-test.jpg" alt="Tweet Image">

              <md-ink-ripple></md-ink-ripple>
            </md-card-media>

            <md-card-content v-if="tweet">{{tweet.content}}</md-card-content>

            <md-card-actions>
              <md-button class="md-icon-button">
                <md-icon>favorite</md-icon>
              </md-button>

              <md-button class="md-icon-button">
                <md-icon>comment</md-icon>
              </md-button>

              <md-button class="md-icon-button">
                <md-icon>share</md-icon>
              </md-button>
            </md-card-actions>
          </md-card>

        </div>

        <div style="width: 100%">
          <md-input-container>
            <label>评论</label>
            <md-textarea v-model="comment" maxlength="150"></md-textarea>
          </md-input-container>

          <md-layout md-align="end">
            <md-button class="md-raised md-primary" @click.native="publishComment">发布</md-button>
          </md-layout>
        </div>
      </md-layout>

      <md-layout></md-layout>
    </md-layout>

  </div>
</template>

<script>
  import Axios from 'axios'

  const BASE_URL = 'http://localhost:8000/'

  export default {
    data () {
      return {
        tweet: null,
        comment: ''
      }
    },
    created () {
      const TWEET_API = BASE_URL + 'tweets/' + this.$route.params.id

      Axios.get(TWEET_API)
        .then(response => {
          this.tweet = response.data.data
          console.log(this.tweet)
        })
        .catch(error => {
          console.log(error)
        })
    },
    methods: {
      publishComment () {
      }
    }
  }
</script>

<style scoped>

</style>
