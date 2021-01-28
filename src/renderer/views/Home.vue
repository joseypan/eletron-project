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
export default {
  name: 'Home',
  data () {
    return {
      pieChart: '', // 饼状图实例
      barChart: '' // 柱状图实例
    }
  },
  mounted () {
    this.$nextTick(() => {
      this._initPieChart()
      this._initBarChart()
      window.onresize = () => {
        this.resize()
      }
    })
  },
  methods: {
    // 初始化饼状图
    _initPieChart () {
      this.pieChart = this.$echarts.init(this.$refs.piechart)
      let option = {
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
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
            data: [
              { value: 1048, name: '搜索引擎' },
              { value: 735, name: '直接访问' },
              { value: 580, name: '邮件营销' },
              { value: 484, name: '联盟广告' },
              { value: 300, name: '视频广告' }
            ],
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
    // 初始化柱状图
    _initBarChart () {
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
            name: '蒸发量',
            type: 'bar',
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ],
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
            name: '降水量',
            type: 'bar',
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ],
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
