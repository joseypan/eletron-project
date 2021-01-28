<template>
  <div class="alarm">
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="报警提醒电话">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="报警提醒邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="float:right">保存</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Alarm',
  data () {
    return {
      form: {
        tel: '',
        email: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('提交')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/common.scss';
.alarm{
  width: 100%;
  padding: $defaultDistance;
  .form-container{
    width: 80%;
  }
}
</style>
