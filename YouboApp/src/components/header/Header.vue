<template>
  <div>
    <div class="phone-viewport">

      <md-toolbar class="md-dense">

        <h2 class="md-title" style="flex: 1">
          <router-link to="/">Youbo</router-link>
        </h2>

        <!-- TODO: need to change ui -->
        <SearchBox @getParamSuccess="onSuccessGetParam"></SearchBox>

        <router-link :to="userIdPath" v-if="userinfo !== null">
          <div class="user-link-wrapper">
            <md-avatar v-if="userinfo !== null">
              <img src="../../assets/youbo-logo.png" alt="Avatar">
            </md-avatar>
            <span v-if="userinfo !== null">{{userinfo.nickname}}</span>
          </div>
        </router-link>

        <router-link to="/" v-if="userinfo !== null">
          <md-button v-if="userinfo !== null" @click.native="logout()">退出</md-button>
        </router-link>

        <md-button v-if="userinfo === null" id="login" @click.native="openDialog('loginDialog')">登录</md-button>
        <md-button v-if="userinfo === null" id="register" @click.native="openDialog('registerDialog')">注册</md-button>

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
  import SearchBox from '../base/searchbox/SearchBox'
  import Login from '../login/Login'
  import Register from '../register/Register'

  export default {
    data () {
      return {
        userinfo: (() => {
          return loadFromLocal(MOCK_ID, USER_INFO_KEY, null)
        })(),
        vertical: 'bottom',
        horizontal: 'center',
        duration: 4000
      }
    },
    computed: {
      // TODO: solve the route problem with the dirty method, will be improved later
      userIdPath () {
        return '/users/' + this.userinfo.id + '/info'
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

        this.userinfo = user
      },
      onSuccessRegister () {
        this.closeDialog('registerDialog')
        this.openSnackbar('registerSnackbar')
      },
      logout () {
        this.userinfo = null
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
