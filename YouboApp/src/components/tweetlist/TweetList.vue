<template>
  <div>

    <md-layout md-gutter>
      <!--TODO: will be extracted later-->
      <md-layout md-align="end">
        <md-layout md-flex="33">
          <md-list>
            <md-list-item>
              <md-icon>whatshot</md-icon>
              <span>热门</span>
            </md-list-item>

            <md-list-item>
              <md-icon>chevron_right</md-icon>
              <span>明星</span>
            </md-list-item>

            <md-list-item>
              <md-icon>chevron_right</md-icon>
              <span>搞笑</span>
            </md-list-item>

            <md-list-item>
              <md-icon>chevron_right</md-icon>
              <span>社会</span>
            </md-list-item>

            <div class="md-divider"></div>

            <md-list-item>
              <md-icon>videocam</md-icon>
              <span>视频</span>
            </md-list-item>

            <div class="md-divider"></div>

            <md-list-item>
              <md-icon>toys</md-icon>
              <span>头条</span>
            </md-list-item>

            <md-list-item>
              <md-icon>chevron_right</md-icon>
              <span>情感</span>
            </md-list-item>

            <md-list-item>
              <md-icon>chevron_right</md-icon>
              <span>时尚</span>
            </md-list-item>

            <md-list-item>
              <md-icon>chevron_right</md-icon>
              <span>军事</span>
            </md-list-item>

            <div class="md-divider"></div>

            <md-list-item>
              <md-icon>spa</md-icon>
              <span>榜单</span>
            </md-list-item>

          </md-list>
        </md-layout>

      </md-layout>

      <md-layout md-flex="50">

        <div style="width: 100%" v-if="userinfo != null">
          <md-input-container>
            <label>有什么新鲜事想告诉大家？</label>
            <md-textarea v-model="content" maxlength="150"></md-textarea>
          </md-input-container>

          <md-layout md-align="end">
            <md-button class="md-raised md-primary" @click.native="publishTweet">发布</md-button>
          </md-layout>
        </div>

        <div style="width: 100%">
          <div v-for="item in tweetList" :key="item.id">
            <TweetItem :tweet="item"></TweetItem>
            <Split></Split>
          </div>
        </div>
      </md-layout>

      <md-layout></md-layout>
    </md-layout>

    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="publishTweetSnackbar" :md-duration="duration">
      <span>发推文成功</span>
      <md-button class="md-accent" @click.native="closeSnackbar('publishTweetSnackbar')">确定</md-button>
    </md-snackbar>
  </div>
</template>

<script>
  import Axios from 'axios'
  import querystring from 'querystring'
  import { loadFromLocal, MOCK_ID, USER_INFO_KEY } from '../../common/js/store'
  import TweetItem from '../tweetitem/TweetItem'
  import Split from '../split/Split'
  import { INSERT_TWEET_API } from '../../common/js/constant'

  export default {
    props: {
      tweetList: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        userinfo: (() => {
          return loadFromLocal(MOCK_ID, USER_INFO_KEY, null)
        })(),
        content: '',
        vertical: 'bottom',
        horizontal: 'center',
        duration: 4000
      }
    },
    methods: {
      openSnackbar (ref) {
        this.$refs[ref].open()
      },
      closeSnackbar (ref) {
        this.$refs[ref].close()
      },
      publishTweet () {
        Axios.post(INSERT_TWEET_API, querystring.stringify({
          content: this.content,
          user: this.userinfo.id
        }))
          .then((response) => {
            this.tweet = response.data.data
            console.log('发推文成功，内容是:' + this.tweet.content)

            this.$emit('publishTweetSuccess')

            this.openSnackbar('publishTweetSnackbar')
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    components: {
      TweetItem,
      Split
    }
  }
</script>

<style scoped>

</style>
