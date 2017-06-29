<template>
  <div class="card-wrapper">
    <md-card>
      <md-card-header>
        <div class="md-title">登录</div>
      </md-card-header>

      <md-card-content>
        <md-input-container>
          <md-icon>account_circle</md-icon>
          <label>用户名</label>
          <md-input type="text" v-model="username"></md-input>
        </md-input-container>

        <md-input-container md-has-password>
          <md-icon>lock</md-icon>
          <label>密码</label>
          <md-input type="password" v-model="password"></md-input>
        </md-input-container>

        <md-layout md-align="center">
          <md-button class="md-raised md-primary" @click.native="doLogin">登录</md-button>
        </md-layout>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
  import { getUser } from '../../api/user'
  import { ERR_OK } from '../../api/config'

  export default {
    data () {
      return {
        user: {},
        username: '',
        password: ''
      }
    },
    methods: {
      _getUser () {
        getUser(this.username)
          .then(res => {
            if (res.code === ERR_OK) {
              this.user = res.data

              // TODO: will be improved later
              if (this.username === this.user.username) {
                if (this.password === this.user.password) {
                  console.log('登录成功，欢迎你' + this.username)
                  this.$emit('loginSuccess', this.user)
                } else {
                  console.log('密码错误')
                }
              }
            }
          })
      },
      doLogin () {
        this._getUser()
      }
    }
  }
</script>

<style scoped>
</style>
