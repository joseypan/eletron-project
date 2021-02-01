/**
 * @FileDescription: 管理请求路径文件
 * @Author: 潘旭敏
 * @Date: 2021-1-28
 * @LastEditors: 潘旭敏
 * @LastEditTime: 2021-02-01 9:20
 */
const loginPath = '/yuqing/index.php?m=Api&a=login' // 登录路径
const addKeywordsPath = '/yuqing/index.php?m=Api&a=addKeywords' // 增加舆情关键词
const getKeywordsPath = '/yuqing/index.php?m=Api&a=keywordsList' // 获取舆情关键词列表
const editKeywordsPath = '/yuqing/index.php?m=Api&a=editKeywords' // 修改舆情关键词
const removeKeywordsPath = '/yuqing/index.php?m=Api&a=removeKeywords' // 移除舆情关键词
const alarmInfoPath = '/yuqing/index.php?m=Api&a=alarmList' // 获取舆情警报信息
const editAlarmPath = '/yuqing/index.php?m=Api&a=editAlarm' // 修改舆情警报信息
const getReportPath = '/yuqing/index.php?m=Api&a=logList' // 获取舆情报告列表
const getPieDataPath = '/yuqing/index.php?m=Api&a=areaOptions' // 获取饼状图的数据
const getBarDataPath = '/yuqing/index.php?m=Api&a=columnOptions' // 获取柱状图的数据
export {
  loginPath,
  addKeywordsPath,
  getKeywordsPath,
  editKeywordsPath,
  removeKeywordsPath,
  alarmInfoPath,
  editAlarmPath,
  getReportPath,
  getPieDataPath,
  getBarDataPath
}
