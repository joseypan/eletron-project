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
      isLoading: false
    }
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
        }
      } else {
        this.$message.warning('用户名或密码为空！')
      }
    },
    changeStatus () {
      this.isShow = !this.isShow
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
