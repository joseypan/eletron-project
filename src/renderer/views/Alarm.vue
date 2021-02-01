<template>
  <div class="alarm">
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="报警提醒电话">
          <el-input v-model="form.tel" @input="updateInfo"></el-input>
        </el-form-item>
        <el-form-item label="报警提醒邮箱">
          <el-input v-model="form.email" @input="updateInfo"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            style="float:right"
            :disabled="isBan"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import sign from '../tools/sign'
import { alarmInfoPath, editAlarmPath } from '../request/api'
export default {
  name: 'Alarm',
  data () {
    return {
      form: {
        tel: '',
        email: ''
      },
      userInfo: {},
      isBan: true
    }
  },
  created () {
    this.getAlarmInfo()
  },
  methods: {
    async onSubmit () {
      let signStr = this.handleSign({
        a: 'editAlarm'
      })
      let res = await this.$request({
        type: 'post',
        url: editAlarmPath,
        params: {
          ...this.form,
          uid: this.userInfo.id,
          sign: signStr
        }
      })
      this.$message({
        message: res.message,
        type: 'success',
        duration: 800
      })
      this.isBan = true
    },
    /**
     * 描述：处理生成方法需要的签名
     * @param { Object } options 包含生成签名的类型以及用户信息
     * @return { String } 生成的签名字符串
     */
    handleSign (options) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      let signStr = sign({
        ...options,
        uid: this.userInfo.id,
        salt: this.userInfo.salt // 安全随机数
      })
      return signStr
    },
    async getAlarmInfo () {
      let signStr = this.handleSign({
        a: 'alarmList'
      })
      let res = await this.$request({
        type: 'get',
        url: `${alarmInfoPath}&sign=${signStr}&uid=${this.userInfo.id}`,
        params: null
      })
      this.form = res.result
    },
    // 修改数据时触发
    updateInfo () {
      this.isBan = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/common.scss';
.alarm {
  width: 100%;
  padding: $defaultDistance;
  .form-container {
    width: 80%;
  }
}
</style>
