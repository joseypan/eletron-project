<!--
* @FileDescription: 
* @Author: 潘旭敏
* @Date: 2021-01-28
* @LastEditors: 潘旭敏
* @LastEditTime: 2021-01-28 13:55
 -->
<template>
  <div class="keywords">
    <div class="keywords-header">
      <el-button type="primary" @click="dialogFormVisible = true"
        >添加关键词</el-button
      >
      <!-- 弹出框 -->
      <el-dialog title="添加关键词" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="必须包含关键词" :label-width="formLabelWidth">
            <el-input v-model="form.keyword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="可包含关键词" :label-width="formLabelWidth">
            <el-input v-model="form.may_keyword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="不包含关键词" :label-width="formLabelWidth">
            <el-input v-model="form.nokeyword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="监控频率" :label-width="formLabelWidth">
            <el-input v-model="form.frequency" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitKeywords">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="keywords-main">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="keyword" label="必须包含词"> </el-table-column>
        <el-table-column prop="may_keyword" label="可包含词"> </el-table-column>
        <el-table-column prop="nokeyword" label="不包含词"> </el-table-column>
        <el-table-column prop="frequency" label="监控频率"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editKeywords(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="removeKeywords(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑框 -->
      <el-dialog title="修改关键词" :visible.sync="editDialogFormVisible">
        <el-form :model="editFormData">
          <el-form-item label="必须包含关键词" :label-width="formLabelWidth">
            <el-input
              v-model="editFormData.keyword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="可包含关键词" :label-width="formLabelWidth">
            <el-input
              v-model="editFormData.may_keyword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="不包含关键词" :label-width="formLabelWidth">
            <el-input
              v-model="editFormData.nokeyword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="监控频率" :label-width="formLabelWidth">
            <el-input
              v-model="editFormData.frequency"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitEdit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import sign from '../tools/sign'
import {
  addKeywordsPath, // 增加关键词路径
  editKeywordsPath, // 修改关键词路径
  getKeywordsPath, // 获取关键词列表
  removeKeywordsPath // 删除关键词路径
} from '../request/api'
export default {
  name: 'Keywords',
  data () {
    return {
      dialogFormVisible: false, // 弹出框是否可见
      editDialogFormVisible: false, // 编辑弹出框是否可见
      form: {
        keyword: '', // 必须包含
        may_keyword: '', // 可包含
        nokeyword: '', // 不包含
        frequency: '' // 监控频率
      },
      formLabelWidth: '120px',
      tableData: [],
      userInfo: {},
      editFormData: {
        keyword: '', // 必须包含
        may_keyword: '', // 可包含
        nokeyword: '', // 不包含
        frequency: '' // 监控频率
      }
    }
  },
  created () {
    this.getKeywordsList()
  },
  methods: {
    async submitKeywords () {
      for (let key in this.form) {
        if (!this.form[key]) {
          this.$message({
            type: 'error',
            message: '请填写完整',
            duration: 800
          })
          return
        }
      }
      let signStr = this.handleSign({
        a: 'addKeywords'
      })
      let data = {
        ...this.form,
        sign: signStr,
        uid: this.userInfo.id
      }
      let res = await this.$request({
        type: 'post',
        params: data,
        url: addKeywordsPath
      })
      this.$message({
        type: 'success',
        message: res.message,
        duration: 800
      })
      this.form = {
        keyword: '', // 必须包含
        may_keyword: '', // 可包含
        nokeyword: '', // 不包含
        frequency: '' // 监控频率
      }
      this.dialogFormVisible = false
      this.getKeywordsList()
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
    async getKeywordsList () {
      let signStr = this.handleSign({
        a: 'keywordsList'
      })
      let data = {
        sign: signStr,
        uid: this.userInfo.id
      }
      let res = await this.$request({
        type: 'get',
        params: null,
        url: `${getKeywordsPath}&uid=${data.uid}&sign=${data.sign}`
      })
      this.tableData = res.result
    },
    /**
     * 描述：编辑关键词
     * @param { Object } data 当前行的数据
     */
    editKeywords (data) {
      this.editDialogFormVisible = true
      this.editFormData = data
    },
    // 提交修改表单
    async submitEdit () {
      let signStr = this.handleSign({
        a: 'editKeywords',
        id: this.editFormData.id
      })
      let data = {
        ...this.editFormData,
        sign: signStr,
        uid: this.userInfo.id
      }
      let res = await this.$request({
        type: 'post',
        params: data,
        url: editKeywordsPath
      })
      this.$message({
        type: 'success',
        message: res.message,
        duration: 800
      })
      this.editFormData = {
        keyword: '', // 必须包含
        may_keyword: '', // 可包含
        nokeyword: '', // 不包含
        frequency: '' // 监控频率
      }
      this.editDialogFormVisible = false
      this.getKeywordsList()
    },
    /**
     * 描述：清除关键词
     * @param { Object } data 当前行的数据
     */
    async removeKeywords (data) {
      let signStr = this.handleSign({
        a: 'removeKeywords',
        id: data.id
      })
      let object = {
        id: data.id,
        sign: signStr,
        uid: this.userInfo.id
      }
      let res = await this.$request({
        type: 'post',
        url: removeKeywordsPath,
        params: object
      })
      this.$message({
        type: 'success',
        message: res.message,
        duration: 800
      })
      this.getKeywordsList()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/common.scss';
.keywords {
  width: 100%;
  padding: $defaultDistance;
  .keywords-header {
    height: 60px;
    line-height: 60px;
    padding-left: $defaultDistance;
    background-color: rgb(248, 239, 201);
    .el-button {
      margin-left: $defaultDistance;
    }
  }
  .keywords-main {
    margin-top: $defaultDistance;
    .page-container {
      margin-top: $defaultDistance;
      text-align: center;
    }
  }
}
</style>
