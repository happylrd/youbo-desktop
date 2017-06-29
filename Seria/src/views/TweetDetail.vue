<template>
  <div>
    <md-layout md-gutter>
      <md-layout></md-layout>

      <md-layout md-flex="50">
        <div style="width: 100%">
          <md-card md-with-hover>
            <md-card-header>
              <md-avatar>
                <img src="../common/image/avatar.png" alt="Avatar">
              </md-avatar>

              <div class="md-title">{{tweet.user.nickname}}</div>
              <div class="md-subhead">
                {{tweet.createTime.year}}/{{tweet.createTime.monthValue}}/{{tweet.createTime.dayOfMonth}}
              </div>
            </md-card-header>

            <md-card-media>
              <img src="http://cdn.happylrd.com/image/shaosiming_1.jpg" alt="Tweet Image" width="500" height="400">
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

        <div style="width: 100%" v-if="user !== null">
          <md-input-container>
            <label>评论</label>
            <md-textarea v-model="commentContent" maxlength="150"></md-textarea>
          </md-input-container>

          <md-layout md-align="end">
            <md-button class="md-raised md-primary" @click.native="publishComment">发布</md-button>
          </md-layout>
        </div>

        <!-- TODO: will change ui later -->
        <div style="width: 100%; margin-top: 70px">
          <div v-for="item in commentList" :key="item.id">
            <md-card>
              <md-card-header>
                <md-avatar>
                  <img src="../common/image/avatar.png" alt="Avatar">
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
  import { getTweet, getComment, saveComment } from '../api/tweet'
  import { ERR_OK } from '../api/config'
  import { loadFromLocal, MOCK_ID, USER_INFO_KEY } from '../common/js/store'

  export default {
    data () {
      return {
        user: (() => {
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
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      openSnackbar (ref) {
        this.$refs[ref].open()
      },
      closeSnackbar (ref) {
        this.$refs[ref].close()
      },
      _getTweet () {
        getTweet(this.$route.params.id)
          .then(res => {
            if (res.code === ERR_OK) {
              this.tweet = res.data
              console.log(this.tweet)
            }
          })
      },
      _getComment () {
        getComment(this.$route.params.id)
          .then(res => {
            if (res.code === ERR_OK) {
              this.commentList = res.data
            }
          })
      },
      fetchData () {
        this._getTweet()
        this._getComment()
      },
      publishComment () {
        saveComment(this.user.id, this.tweet.id, this.commentContent)
          .then(res => {
            this.comment = res.data
            this.$emit('publishCommentSuccess')
            this.openSnackbar('commentSnackbar')
          })
      }
    }
  }
</script>

<style scoped>
</style>
