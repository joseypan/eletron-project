<!--
* @FileDescription: 舆情报告全部舆情页面
* @Author: 潘旭敏
* @Date: 2021-01-28
* @LastEditors: 潘旭敏
* @LastEditTime: 2021-01-28 11:11
 -->
<template>
  <div class="report">
    <div class="report-header">
      <el-col :span="8">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="startDate"
          style="width: 100%"
        ></el-date-picker>
      </el-col>
      <el-col class="line" :span="1">-</el-col>
      <el-col :span="8">
        <el-date-picker
          placeholder="选择时间"
          v-model="endDate"
          style="width: 100%"
        ></el-date-picker>
      </el-col>
      <el-col class="line" :span="2"
        ><el-button type="primary" @click="searchForm">查询</el-button></el-col
      >
    </div>
    <div class="report-main">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="title" label="标题/地址"> </el-table-column>
        <el-table-column prop="type" label="舆情类型" width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.type | handleType}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="keywords" label="舆情关键词" width="100px">
        </el-table-column>
        <el-table-column prop="url" label="舆情网站">
          <template slot-scope="scope">
            <span class="link-path" @click="openExternal(scope.row.url)">{{
              scope.row.url
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="add_time" label="发现时间" width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.add_time | handleTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="帖子时间" width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.update_time | handleTime }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-container">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-count="totalNum"
          hide-on-single-page
          :current-page="currentPage"
          @current-change="pageChange($event)"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getReportPath } from '../request/api'
import sign from '../tools/sign'
import moment from 'moment'
export default {
  name: 'Report',
  data () {
    return {
      startDate: '', // 起始日期
      endDate: '', // 结束日期
      tableData: [],
      userInfo: {},
      totalNum: 0,
      currentPage: 1
    }
  },
  created () {
    this.getReportForm()
  },
  methods: {
    /**
     * 描述：改变分页标签页码
     * @param { Number } e 当前点击页码
     */
    pageChange (e) {
      this.currentPage = e
      this.getReportForm()
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
    async getReportForm () {
      let signStr = this.handleSign({
        a: 'logList'
      })
      let data = {
        uid: this.userInfo.id,
        sign: signStr,
        p: this.currentPage,
        start_time:
          this.startDate === '' ? '' : moment(this.startDate).valueOf() / 1000,
        end_time:
          this.endDate === '' ? '' : moment(this.endDate).valueOf() / 1000,
        type: 1
      }
      let res = await this.$request({
        type: 'get',
        url: getReportPath,
        params: data
      })
      this.tableData = res.result
      this.totalNum = res.totalPage
    },
    /**
     * 描述：点击网站链接在外部打开网页
     * @param { String } url 用户点击的地址
     */
    openExternal (url) {
      this.$electron.shell.openExternal(url)
    },
    searchForm () {
      this.currentPage = 1
      this.getReportForm()
    }
  },
  filters: {
    /**
     * 描述：处理舆情类型
     * @param { Number } value 表示舆情类型的数值
     * @return { String } 数值对应的文字
     */
    handleType (value) {
      if (value === '-1') {
        return '负面消息'
      } else if (value === '0') {
        return '中性消息'
      } else if (value === '1') {
        return '正面消息'
      } else {
        return '未知类型'
      }
    },
    handleTime (value) {
      return moment(value * 1000).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/common.scss';
.report {
  width: 100%;
  padding: $defaultDistance;
  .report-header {
    height: 60px;
    line-height: 60px;
    padding-left: $defaultDistance;
    background-color: rgb(248, 239, 201);
    .line {
      text-align: center;
    }
    .el-button {
      margin-left: $defaultDistance;
    }
  }
  .report-main {
    margin-top: $defaultDistance;
    .el-table {
      .link-path {
        cursor: pointer;
        &:hover {
          color: coral;
        }
      }
    }
    .page-container {
      margin-top: $defaultDistance;
      text-align: center;
    }
  }
}
</style>
