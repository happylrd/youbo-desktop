<template>
  <div>

    <md-layout md-gutter>
      <md-layout></md-layout>

      <md-layout md-flex="50">

        <div style="width: 100%">
          <md-card>
            <md-card-header>
              <div class="md-title">个人资料</div>
            </md-card-header>

            <md-card-content>
              <md-input-container>
                <md-icon>account_circle</md-icon>
                <label>昵称</label>
                <md-input type="text"
                          v-model="userinfo.nickname"
                          :disabled="!isModified"></md-input>
              </md-input-container>

              <md-input-container>
                <md-icon>phone</md-icon>
                <label>手机号</label>
                <md-input type="number"
                          v-model="userinfo.username"
                          disabled></md-input>
              </md-input-container>

              <md-input-container>
                <md-icon>account_circle</md-icon>
                <label>真实姓名</label>
                <md-input type="text"
                          v-model="userinfo.realname"
                          :disabled="!isModified"></md-input>
              </md-input-container>

              <div>
                <md-radio v-model="userinfo.gender" md-value="male" :disabled="!isModified">男</md-radio>
                <md-radio v-model="userinfo.gender" md-value="female" :disabled="!isModified">女</md-radio>
                <md-radio v-model="userinfo.gender" md-value="unknown" :disabled="!isModified">未知</md-radio>
              </div>

              <md-input-container>
                <md-icon>lock</md-icon>
                <label>头像</label>
                <md-file v-model="avatar" accept="image/*" :disabled="!isModified"></md-file>
              </md-input-container>

              <md-button class="md-raised md-primary" @click.native="enterModifyMode">{{isModifyModeStr}}</md-button>
              <md-button class="md-raised md-warn" @click.native="doModify" v-if="isModified">更改</md-button>
            </md-card-content>
          </md-card>
        </div>

      </md-layout>

      <md-layout></md-layout>
    </md-layout>

    <md-snackbar :md-position="vertical + ' ' + horizontal" ref="updateInfoSnackbar" :md-duration="duration">
      <span>更新个人信息成功</span>
      <md-button class="md-accent" @click.native="closeSnackbar('updateInfoSnackbar')">确定</md-button>
    </md-snackbar>
  </div>
</template>

<script>
  import Axios from 'axios'
  import querystring from 'querystring'
  import { USER_API } from '../../common/js/constant'
  import { loadFromLocal, saveToLocal, MOCK_ID, USER_INFO_KEY } from '../../common/js/store'

  export default {
    data () {
      return {
        userinfo: (() => {
          return loadFromLocal(MOCK_ID, USER_INFO_KEY, null)
        })(),
        isModified: false,
        vertical: 'bottom',
        horizontal: 'center',
        duration: 4000
      }
    },
    computed: {
      isModifyModeStr () {
        return this.isModified ? '退出更改模式' : '进入更改模式'
      }
    },
    methods: {
      openSnackbar (ref) {
        this.$refs[ref].open()
      },
      closeSnackbar (ref) {
        this.$refs[ref].close()
      },
      enterModifyMode () {
        this.isModified = !this.isModified
      },
      doModify () {
        Axios.put(USER_API + this.userinfo.id, querystring.stringify({
          nickname: this.userinfo.nickname,
          realname: this.userinfo.realname,
          gender: this.userinfo.gender,
          description: this.userinfo.description
        }))
          .then((response) => {
            saveToLocal(MOCK_ID, USER_INFO_KEY, response.data.data)
//            this.$emit('updateUserInfoSuccess')

            this.openSnackbar('updateInfoSnackbar')
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
