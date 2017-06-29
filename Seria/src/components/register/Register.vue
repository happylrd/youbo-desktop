<template>
  <div class="card-wrapper">
    <md-card>
      <md-card-header>
        <div class="md-title">注册</div>
      </md-card-header>

      <md-card-content>

        <md-input-container>
          <md-icon>account_circle</md-icon>
          <label>昵称</label>
          <md-input type="text" v-model="nickname" required></md-input>
        </md-input-container>

        <md-input-container>
          <md-icon>account_circle</md-icon>
          <label>手机/邮箱</label>
          <md-input type="text" v-model="username" required></md-input>
        </md-input-container>

        <md-input-container md-has-password>
          <md-icon>lock</md-icon>
          <label>密码</label>
          <md-input type="password" v-model="password" required></md-input>
        </md-input-container>

        <md-layout md-align="center">
          <md-button class="md-raised md-primary" @click.native="doRegister">注册</md-button>
        </md-layout>
      </md-card-content>

    </md-card>
  </div>
</template>

<script>
  import { saveUser } from '../../api/user'
  import { ERR_OK } from '../../api/config'

  export default {
    data () {
      return {
        username: '',
        password: '',
        nickname: ''
      }
    },
    methods: {
      _saveUser () {
        saveUser(this.username, this.password, this.nickname)
          .then(res => {
            if (res.code === ERR_OK) {
              this.user = res.data
              console.log('注册成功，欢迎你' + this.user.nickname)
              this.$emit('registerSuccess')
            }
          })
      },
      doRegister () {
        this._saveUser()
      }
    }
  }
</script>

<style scoped>
</style>
