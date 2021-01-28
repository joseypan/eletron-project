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
  </div>
</template>
<script>
import Loading from '../components/common/Loading'
export default {
  name: 'Login',
  components: {
    Loading
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
    turnToMain () {
      console.log('点击了')
      //   this.$router.push('/main')
      const { ipcRenderer } = this.$electron
      console.log(ipcRenderer)
      ipcRenderer.send('userLogin', 'successful')
      this.isLoading = false
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
