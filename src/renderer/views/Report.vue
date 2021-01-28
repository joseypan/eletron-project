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
        ><el-button type="primary">查询</el-button></el-col
      >
    </div>
    <div class="report-main">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="title" label="标题/地址"> </el-table-column>
        <el-table-column prop="type" label="舆情类型"> </el-table-column>
        <el-table-column prop="keywords" label="舆情关键词"> </el-table-column>
        <el-table-column prop="website" label="舆情网站"> </el-table-column>
        <el-table-column prop="findTime" label="发现时间"> </el-table-column>
        <el-table-column prop="docTime" label="帖子时间"> </el-table-column>
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
export default {
  name: 'Report',
  data () {
    return {
      startDate: '', // 起始日期
      endDate: '', // 结束日期
      tableData: [
        {
          title: '大庆6个月拘留467名“马路杀手”',
          type: '负面舆情',
          keywords: '油田',
          website: '油田信息港',
          findTime: '2014-07-21 16:00:01',
          docTime: '1970-01-01 08:00:00'
        },
        {
          title: '大庆6个月拘留467名“马路杀手”',
          type: '负面舆情',
          keywords: '油田',
          website: '油田信息港',
          findTime: '2014-07-21 16:00:01',
          docTime: '1970-01-01 08:00:00'
        },
        {
          title: '大庆6个月拘留467名“马路杀手”',
          type: '负面舆情',
          keywords: '油田',
          website: '油田信息港',
          findTime: '2014-07-21 16:00:01',
          docTime: '1970-01-01 08:00:00'
        },
        {
          title: '大庆6个月拘留467名“马路杀手”',
          type: '负面舆情',
          keywords: '油田',
          website: '油田信息港',
          findTime: '2014-07-21 16:00:01',
          docTime: '1970-01-01 08:00:00'
        },
        {
          title: '大庆6个月拘留467名“马路杀手”',
          type: '负面舆情',
          keywords: '油田',
          website: '油田信息港',
          findTime: '2014-07-21 16:00:01',
          docTime: '1970-01-01 08:00:00'
        },
        {
          title: '大庆6个月拘留467名“马路杀手”',
          type: '负面舆情',
          keywords: '油田',
          website: '油田信息港',
          findTime: '2014-07-21 16:00:01',
          docTime: '1970-01-01 08:00:00'
        },
        {
          title: '大庆6个月拘留467名“马路杀手”',
          type: '负面舆情',
          keywords: '油田',
          website: '油田信息港',
          findTime: '2014-07-21 16:00:01',
          docTime: '1970-01-01 08:00:00'
        },
        {
          title: '大庆6个月拘留467名“马路杀手”',
          type: '负面舆情',
          keywords: '油田',
          website: '油田信息港',
          findTime: '2014-07-21 16:00:01',
          docTime: '1970-01-01 08:00:00'
        },
        {
          title: '大庆6个月拘留467名“马路杀手”',
          type: '负面舆情',
          keywords: '油田',
          website: '油田信息港',
          findTime: '2014-07-21 16:00:01',
          docTime: '1970-01-01 08:00:00'
        }
      ]
    }
  },
  methods: {
    /**
     * 描述：改变分页标签页码
     * @param { Number } e 当前点击页码
     */
    pageChange (e) {
      console.log(e)
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
    .page-container {
      margin-top: $defaultDistance;
      text-align: center;
    }
  }
}
</style>
