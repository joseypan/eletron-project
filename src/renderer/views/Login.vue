<!--
* @FileDescription: 客户端登录页
* @Author: 潘旭敏
* @Date: 2021-01-28
* @LastEditors: 潘旭敏
* @LastEditTime: 2021-01-28 15:14
 -->
<template>
  <div class="login">
    <div class="form-container">
      <el-form ref="form" :model="userForm">
        <el-form-item>
          <el-input v-model="userForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="userForm.password"
            :type="isShow ? 'text' : 'password'"
            placeholder="密码"
          >
            <i
              slot="suffix"
              class="el-input__icon"
              :class="isShow ? 'el-icon-open' : 'el-icon-turn-off'"
              @click="changeStatus"
            ></i>
          </el-input>
        </el-form-item>
        <div class="options">
          <div class="remember">
            <label>
              <input
                type="checkbox"
                id="remember"
                v-model="isRemember"
                @change="changeRememberState"
              />记住密码</label
            >
          </div>
          <div class="auto-login">
            <label>
              <input
                type="checkbox"
                id="remember"
                v-model="isAutoLogin"
                @change="changeRememberState"
              />自动登录</label
            >
          </div>
        </div>
        <el-form-item>
          <el-button type="primary" @click="turnToMain">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Loading v-show="isLoading" />
    <!-- <LoadingWave v-show="isLoading" /> -->
  </div>
</template>
<script>
import Loading from '../components/common/Loading'
import LoadingWave from '../components/common/LoadingWave'
import { loginPath } from '../request/api'
export default {
  name: 'Login',
  components: {
    Loading,
    LoadingWave
  },
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      },
      isShow: false,
      isLoading: false,
      isRemember: false,
      isAutoLogin: false
    }
  },
  created () {
    this.showRemeberInfo()
  },
  methods: {
    async turnToMain () {
      // 判断用户是否有未填项
      if (this.userForm.username && this.userForm.password) {
        this.isLoading = true
        let res = await this.$request({
          type: 'post',
          url: loginPath,
          params: this.userForm
        })
        this.isLoading = false
        if (res.result) {
          localStorage.setItem('userInfo', JSON.stringify(res.result))
          const { ipcRenderer } = this.$electron
          ipcRenderer.send('userLogin', 'successful')
        } else {
          this.$message({
            message: res.message,
            type: 'error',
            duration: 800
          })
        }
      } else {
        this.$message.warning('用户名或密码为空！')
      }
    },
    changeStatus () {
      this.isShow = !this.isShow
    },
    changeRememberState () {
      if (this.userForm.username && this.userForm.password) {
        if (this.isRemember) {
          // 判断是否已存在用户数据，存在则更新，不存在则新增
          this.$db.find({ 'userForm.username': 'admin' }, (err, ret) => {
            console.log(err, ret)
            if (ret.length === 0) {
              // 用户需要记住密码
              this.$db.insert(
                {
                  userForm: this.userForm,
                  isAutoLogin: this.isAutoLogin,
                  isRememberInfo: this.isRemember
                },
                (err, ret) => {
                  console.log(err, ret)
                }
              )
            } else {
              // 更新用户数据
              console.log('更新用户数据')
              this.$db.update(
                { 'userForm.username': 'admin' },
                {
                  $set: {
                    'userForm.username': this.userForm.username,
                    'userForm.password': this.userForm.password,
                    isAutoLogin: this.isAutoLogin,
                    isRememberInfo: this.isRemember
                  }
                },
                {},
                (err, ret) => {
                  console.log('更新', err, ret)
                }
              )
            }
            console.log(err)
          })
        } else {
          // 移除数据
          this.$db.remove({ 'userForm.username': 'admin' }, (err, ret) => {
            console.log(err, ret)
          })
        }
      }
    },
    showRemeberInfo () {
      this.$db.find({ 'userForm.username': 'admin' }, (err, ret) => {
        if (err || ret.length === 0) {
          return
        }
        this.userForm = ret[0].userForm
        this.isRemember = ret[0].isRememberInfo
        this.isAutoLogin = ret[0].isAutoLogin
        if (ret[0].isAutoLogin) {
          this.turnToMain()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('../assets/images/login_bg.jpg') no-repeat;
  background-size: cover;
  -webkit-app-region: drag;
  .form-container {
    position: fixed;
    top: 60%;
    left: 50%;
    width: 80%;
    transform: translate(-50%, -50%);
    -webkit-app-region: no-drag;
    text-align: center;
    .options {
      display: flex;
      justify-content: space-between;
      .remember {
        text-align: left;
        font-size: 14px;
        color: #bbb;
      }
      .auto-login {
        text-align: right;
        font-size: 14px;
        color: #bbb;
      }
    }

    .el-button {
      margin-top: 10px;
      width: 80%;
    }
  }
}
.el-input__icon {
  cursor: pointer;
  font-size: 20px;
}
.el-icon-open {
  color: #0066ff;
}
</style>
