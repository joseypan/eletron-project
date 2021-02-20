<!--
* @FileDescription: 关于全局主页的设置以及路由设置
* @Author: 潘旭敏
* @Date: 2021-01-27
* @LastEditors: 潘旭敏
* @LastEditTime:2021-02-01 17:08
 -->
<template>
  <div id="app">
    <router-view />
    <el-dialog
      title="正在更新新版本,请稍候..."
      :visible.sync="dialogVisible"
      width="60%"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnPressEscape"
      :show-close="showClose"
      center
    >
      <div style="width:100%;height:20vh;line-height:20vh;text-align:center">
        <el-progress
          status="success"
          :text-inside="true"
          :stroke-width="20"
          :percentage="percentage"
          :width="strokeWidth"
          :show-text="true"
        ></el-progress>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'electron-project',
  data () {
    return {
      dialogVisible: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      showClose: false,
      percentage: 0,
      strokeWidth: 200
    }
  },
  created () {
    const { ipcRenderer } = this.$electron
    // ipcRenderer.send('checkForUpdate')
    ipcRenderer.on('message', (event, text) => {
      this.tips = text
    })
    ipcRenderer.on('downloadProgress', (event, progressObj) => {
      this.downloadPercent = progressObj.percent || 0
    })
    ipcRenderer.on('isUpdateNow', () => {
      ipcRenderer.send('isUpdateNow')
    })
  },
  mounted () {
    // window.addEventListener('online', () => {
    //   console.log('在线状态')
    // })
    // window.addEventListener('offline', () => {
    //   const option = {
    //     title: '提示！',
    //     body: '网络已经断开了，请检查您的网络设置'
    //   }
    //   new Notification(option)
    // })
    window.addEventListener('contextmenu', event => {
      event.preventDefault()
      this.$electron.ipcRenderer.send('context')
    })
  },
  destroyed () {
    const { ipcRenderer } = this.$electron
    ipcRenderer.removeAll(['message', 'downloadProgress', 'isUpdateNow'])
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 8px;
  height: 16px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  background-color: #555;
}
</style>
