<template>
  <div>
    <div class="phone-viewport">

      <md-toolbar class="md-dense">

        <md-avatar>
          <img src="../../common/image/logo.png" alt="Logo">
        </md-avatar>

        <h2 class="md-title" style="flex: 1;margin-left: 8px">Youbo</h2>

        <SearchBox @getParamSuccess="onSuccessGetParam"></SearchBox>

        <router-link to="/user/main" v-if="user !== null">
          <div class="user-link-wrapper">
            <md-avatar v-if="user !== null">
              <img src="../../common/image/avatar.png" alt="头像">
            </md-avatar>
            <span v-if="user !== null">{{user.nickname}}</span>
          </div>
        </router-link>

        <router-link to="/" v-if="user !== null">
          <md-button v-if="user !== null" @click.native="logout()">退出</md-button>
        </router-link>

        <md-button v-if="user === null" id="login" @click.native="openDialog('loginDialog')">登录</md-button>
        <md-button v-if="user === null" id="register" @click.native="openDialog('registerDialog')">注册</md-button>

      </md-toolbar>

      <md-dialog md-open-from="#login" md-close-to="#login" ref="loginDialog">
        <Login @loginSuccess="onSuccessLogin"></Login>
      </md-dialog>

      <md-dialog md-open-from="#register" md-close-to="#register" ref="registerDialog">
        <Register @registerSuccess="onSuccessRegister"></Register>
      </md-dialog>
    </div>

    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="loginSnackbar" :md-duration="duration">
      <span>登录成功</span>
      <md-button class="md-accent" @click.native="closeSnackbar('loginSnackbar')">确定</md-button>
    </md-snackbar>

    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="logoutSnackbar" :md-duration="duration">
      <span>退出成功</span>
      <md-button class="md-warn" @click.native="closeSnackbar('logoutSnackbar')">确定</md-button>
    </md-snackbar>

    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="registerSnackbar" :md-duration="duration">
      <span>注册成功</span>
      <md-button class="md-accent" @click.native="closeSnackbar('registerSnackbar')">确定</md-button>
    </md-snackbar>
  </div>
</template>

<script>
  import { saveToLocal, loadFromLocal, MOCK_ID, USER_INFO_KEY } from '../../common/js/store'
  import SearchBox from '../../base/SearchBox'
  import Login from '../login/Login'
  import Register from '../register/Register'
  export default {
    data () {
      return {
        user: (() => {
          return loadFromLocal(MOCK_ID, USER_INFO_KEY, null)
        })(),
        vertical: 'bottom',
        horizontal: 'center',
        duration: 4000
      }
    },
    methods: {
      openDialog (ref) {
        this.$refs[ref].open()
      },
      closeDialog (ref) {
        this.$refs[ref].close()
      },
      openSnackbar (ref) {
        this.$refs[ref].open()
      },
      closeSnackbar (ref) {
        this.$refs[ref].close()
      },
      onSuccessLogin (user) {
        saveToLocal(MOCK_ID, USER_INFO_KEY, user)

        this.closeDialog('loginDialog')
        this.openSnackbar('loginSnackbar')

        this.user = user
      },
      onSuccessRegister () {
        this.closeDialog('registerDialog')
        this.openSnackbar('registerSnackbar')
      },
      logout () {
        this.user = null
        saveToLocal(MOCK_ID, USER_INFO_KEY, null)

        this.openSnackbar('logoutSnackbar')
      },
      onSuccessGetParam (searchText) {
        this.$router.push({path: '/search', query: {content: searchText}})
      }
    },
    components: {
      SearchBox,
      Login,
      Register
    }
  }
</script>

<style scoped>
</style>
