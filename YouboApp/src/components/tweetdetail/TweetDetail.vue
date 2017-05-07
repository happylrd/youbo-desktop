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

              <div class="md-title">{{tweet.user.nickname}}</div>
              <div class="md-subhead">
                {{tweet.createTime.year}}/{{tweet.createTime.monthValue}}/{{tweet.createTime.dayOfMonth}}
              </div>
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

        <div style="width: 100%" v-if="userinfo != null">
          <md-input-container>
            <label>评论</label>
            <md-textarea v-model="commentContent" maxlength="150"></md-textarea>
          </md-input-container>

          <md-layout md-align="end">
            <md-button class="md-raised md-primary" @click.native="publishComment">发布</md-button>
          </md-layout>
        </div>

        <div style="width: 100%" v-if="userinfo != null">
          <div v-for="item in commentList" :key="item.id">
            <md-card>
              <md-card-header>
                <md-avatar>
                  <img src="../../assets/youbo-logo.png" alt="Avatar">
                </md-avatar>

                <div class="md-title">{{item.user.nickname}}</div>
                <div class="md-subhead">
                  {{item.createTime.year}}/{{item.createTime.monthValue}}/{{item.createTime.dayOfMonth}}
                </div>
              </md-card-header>

              <md-card-content>{{item.content}}</md-card-content>

              <md-card-actions>
                <md-button>回复</md-button>
                <md-button>赞</md-button>
              </md-card-actions>
            </md-card>
          </div>
        </div>
      </md-layout>

      <md-layout></md-layout>
    </md-layout>
  </div>
</template>

<script>
  import Axios from 'axios'
  import querystring from 'querystring'
  import { loadFromLocal, MOCK_ID } from '../../common/js/store'
  import { BASE_URL } from '../../common/js/constant'

  export default {
    data () {
      return {
        userinfo: (() => {
          return loadFromLocal(MOCK_ID, 'userinfo', null)
        })(),
        tweet: null,
        commentList: null,
        commentContent: ''
      }
    },
    created () {
      const TWEET_API = BASE_URL + 'tweets/' + this.$route.params.id

      Axios.get(TWEET_API)
        .then(response => {
          this.tweet = response.data.data
//          console.log(this.tweet)
        })
        .catch(error => {
          console.log(error)
        })

      const COMMENT_API = BASE_URL + 'tweets/' + this.$route.params.id + '/comments'

      Axios.get(COMMENT_API)
        .then(response => {
          this.commentList = response.data.data
          console.log(this.commentList)
        })
        .catch(error => {
          console.log(error)
        })
    },
    methods: {
      publishComment () {
        const COMMENT_API = BASE_URL + 'comments'

        Axios.post(COMMENT_API, querystring.stringify({
          // TODO: user state will be improved later
          user: this.userinfo.id,
          tweet: this.tweet.id,
          content: this.commentContent
        }))
          .then((response) => {
//            this.comment = response.data.data
            this.$emit('publishCommentSuccess')
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>

<style scoped>

</style>
