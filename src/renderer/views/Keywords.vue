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
        <el-table-column prop="title" label="标题/地址" width="100px">
        </el-table-column>
        <el-table-column prop="required" label="必须包含词" width="120px">
        </el-table-column>
        <el-table-column prop="included" label="可包含词" width="100px">
        </el-table-column>
        <el-table-column prop="unincluded" label="不包含词" width="100px">
        </el-table-column>
        <el-table-column prop="monitorRate" label="监控频率" width="80px">
        </el-table-column>
        <el-table-column prop="negativeNum" label="负面数" width="80px">
        </el-table-column>
        <el-table-column prop="totalNum" label="舆情总数" width="80px">
        </el-table-column>
        <el-table-column prop="updateTime" label="下次更新时间">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看内容</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-container">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000"
          @current-change="pageChange($event)"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import addKeywordsPath from '../request/api'
export default {
  name: 'Keywords',
  data () {
    return {
      dialogFormVisible: false, // 弹出框是否可见
      form: {
        keyword: '', // 必须包含
        may_keyword: '', // 可包含
        nokeyword: '', // 不包含
        frequency: '' // 监控频率
      },
      formLabelWidth: '120px',
      tableData: [
        {
          title: '企业舆情',
          required: '天然气分公司扁平化管理',
          included: '',
          unincluded: '',
          monitorRate: '0分',
          negativeNum: '负面：0',
          totalNum: '1',
          updateTime: '2014-07-08 08:38:45'
        },
        {
          title: '企业舆情',
          required: '天然气分公司扁平化管理',
          included: '',
          unincluded: '',
          monitorRate: '0分',
          negativeNum: '负面：0',
          totalNum: '1',
          updateTime: '2014-07-08 08:38:45'
        },
        {
          title: '企业舆情',
          required: '天然气分公司扁平化管理',
          included: '',
          unincluded: '',
          monitorRate: '0分',
          negativeNum: '负面：0',
          totalNum: '1',
          updateTime: '2014-07-08 08:38:45'
        },
        {
          title: '企业舆情',
          required: '天然气分公司扁平化管理',
          included: '',
          unincluded: '',
          monitorRate: '0分',
          negativeNum: '负面：0',
          totalNum: '1',
          updateTime: '2014-07-08 08:38:45'
        },
        {
          title: '企业舆情',
          required: '天然气分公司扁平化管理',
          included: '',
          unincluded: '',
          monitorRate: '0分',
          negativeNum: '负面：0',
          totalNum: '1',
          updateTime: '2014-07-08 08:38:45'
        },
        {
          title: '企业舆情',
          required: '天然气分公司扁平化管理',
          included: '',
          unincluded: '',
          monitorRate: '0分',
          negativeNum: '负面：0',
          totalNum: '1',
          updateTime: '2014-07-08 08:38:45'
        },
        {
          title: '企业舆情',
          required: '天然气分公司扁平化管理',
          included: '',
          unincluded: '',
          monitorRate: '0分',
          negativeNum: '负面：0',
          totalNum: '1',
          updateTime: '2014-07-08 08:38:45'
        },
        {
          title: '企业舆情',
          required: '天然气分公司扁平化管理',
          included: '',
          unincluded: '',
          monitorRate: '0分',
          negativeNum: '负面：0',
          totalNum: '1',
          updateTime: '2014-07-08 08:38:45'
        },
        {
          title: '企业舆情',
          required: '天然气分公司扁平化管理',
          included: '',
          unincluded: '',
          monitorRate: '0分',
          negativeNum: '负面：0',
          totalNum: '1',
          updateTime: '2014-07-08 08:38:45'
        }
      ]
    }
  },
  methods: {
    /**
     * 描述：更改分页标签当前页
     * @param { Number } e 当前点击页码
     */
    pageChange (e) {
      console.log(e)
    },
    async submitKeywords () {
      console.log(addKeywordsPath)
      // let data = {
      //   ...this.form,
      //   sign: JSON.parse(localStorage.getItem('userInfo')).salt,
      //   uid: JSON.parse(localStorage.getItem('userInfo')).id
      // }
      // let res = await this.$request({
      //   type: 'post',
      //   params: data,
      //   url: addKeywords
      // })
      // console.log(res)
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
