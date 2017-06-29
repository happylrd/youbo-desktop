<template>
  <div>
    <md-card md-with-hover>
      <md-card-header>
        <md-avatar>
          <img src="../../common/image/avatar.png" alt="Avatar">
        </md-avatar>

        <div class="md-title">{{tweet.user.nickname}}</div>
        <div class="md-subhead">
          {{tweet.createTime.year}}/{{tweet.createTime.monthValue}}/{{tweet.createTime.dayOfMonth}}
        </div>
      </md-card-header>

      <md-card-content>{{tweet.content}}</md-card-content>

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
</template>

<script>
  export default {
    props: {
      tweet: {
        type: Object
      }
    }
  }
</script>

<style scoped>
</style>
