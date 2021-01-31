/**
 * @FileDescription: 封装处理签名的方法
 * @Author: 潘旭敏
 * @Date: 2021-01-31
 * @LastEditors: 潘旭敏
 * @LastEditTime: 2021-01-31 14:32
 */
import SparkMD5 from 'spark-md5'
/**
* 描述：对传过来的参数进行签名算法并进行md5摘要
* @param { Object } options 传输过来需要签名的参数对象
* @return { String } MD5摘要后的字符串
*/
export default function sign (options) {
  let arr = []
  let str = ''
  for (let i in options) {
    arr.push(i)
  }
  arr = arr.sort()
  arr.forEach((item, index) => {
    str += arr[index] + options[item]
  })
  let spark = SparkMD5.hash(str)
  return spark
}
