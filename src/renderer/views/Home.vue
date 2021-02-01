<!--
* @FileDescription: 主页面包括舆情分析的饼状图以及柱状图
* @Author: 潘旭敏
* @Date: 2021-01-28
* @LastEditors: 潘旭敏
* @LastEditTime: 2021-01-28 10：30
 -->
<template>
  <div class="home">
    <div class="piechart-container" ref="piechart"></div>
    <div class="barchart-container" ref="barchart"></div>
  </div>
</template>
<script>
import { getPieDataPath, getBarDataPath } from '../request/api'
import sign from '../tools/sign'
export default {
  name: 'Home',
  data () {
    return {
      pieChart: '', // 饼状图实例
      barChart: '', // 柱状图实例
      userInfo: {},
      pieData: []
    }
  },
  created () {
    this.getPieData()
    this.getBarData()
  },
  mounted () {
    this.$nextTick(() => {
      window.onresize = () => {
        this.resize()
      }
    })
  },
  methods: {
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
    async getPieData () {
      let signStr = this.handleSign({
        a: 'areaOptions'
      })
      let res = await this.$request({
        url: `${getPieDataPath}&sign=${signStr}&uid=${this.userInfo.id}`,
        type: 'get',
        params: null
      })
      let arr = res.result
      let dataArr = []
      arr.forEach(item => {
        dataArr.push({
          name: item.name,
          value: item.count
        })
      })
      this.pieData = dataArr
      this._initPieChart()
    },
    async getBarData () {
      let signStr = this.handleSign({
        a: 'columnOptions'
      })
      let res = await this.$request({
        url: `${getBarDataPath}&sign=${signStr}&uid=${this.userInfo.id}`,
        type: 'get',
        params: null
      })
      this._initBarChart(res.result)
    },
    // 初始化饼状图
    _initPieChart () {
      this.pieChart = this.$echarts.init(this.$refs.piechart)
      let option = {
        title: {
          text: '舆情关键词数量分布图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: this.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      this.pieChart.setOption(option)
    },
    /**
     * 描述：初始化柱状图
     * @param { Array } arr 请求获取的数据
     */
    _initBarChart (arr) {
      this.barChart = this.$echarts.init(this.$refs.barchart)
      let option = {
        title: {
          text: '舆情监控'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['正面舆情', '负面舆情']
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月'
            ]
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: arr[0].name,
            type: 'bar',
            data: arr[0].data,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }]
            }
          },
          {
            name: arr[1].name,
            type: 'bar',
            data: arr[1].data,
            markPoint: {
              data: [
                { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
                { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }]
            }
          }
        ]
      }
      this.barChart.setOption(option)
    },
    resize () {
      this.pieChart.resize()
      this.barChart.resize()
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .piechart-container,
  .barchart-container {
    height: 50%;
    padding: 10px;
  }
}
</style>
