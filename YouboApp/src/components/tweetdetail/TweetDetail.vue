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

    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="commentSnackbar" :md-duration="duration">
      <span>发表评论成功</span>
      <md-button class="md-accent" @click.native="closeSnackbar('commentSnackbar')">确定</md-button>
    </md-snackbar>
  </div>
</template>

<script>
  import Axios from 'axios'
  import querystring from 'querystring'
  import { loadFromLocal, MOCK_ID, USER_INFO_KEY } from '../../common/js/store'
  import { TWEET_API, INSERT_COMMENT_API } from '../../common/js/constant'

  export default {
    data () {
      return {
        userinfo: (() => {
          return loadFromLocal(MOCK_ID, USER_INFO_KEY, null)
        })(),
        tweet: null,
        commentList: null,
        commentContent: '',
        vertical: 'bottom',
        horizontal: 'center',
        duration: 4000
      }
    },
    mounted () {
      Axios.get(TWEET_API + this.$route.params.id)
        .then(response => {
          this.tweet = response.data.data
          console.log(this.tweet)
        })
        .catch(error => {
          console.log(error)
        })

      const GET_COMMENT_API = TWEET_API + this.$route.params.id + '/comments'

      Axios.get(GET_COMMENT_API)
        .then(response => {
          this.commentList = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    methods: {
      openSnackbar (ref) {
        this.$refs[ref].open()
      },
      closeSnackbar (ref) {
        this.$refs[ref].close()
      },
      publishComment () {
        Axios.post(INSERT_COMMENT_API, querystring.stringify({
          // TODO: user state will be improved later
          user: this.userinfo.id,
          tweet: this.tweet.id,
          content: this.commentContent
        }))
          .then((response) => {
//            this.comment = response.data.data
            this.$emit('publishCommentSuccess')

            this.openSnackbar('commentSnackbar')
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
