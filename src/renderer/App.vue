<!--
* @FileDescription: 关于全局主页的设置以及路由设置
* @Author: 潘旭敏
* @Date: 2021-01-27
* @LastEditors: 2021-01-27
* @LastEditTime: 14:46
 -->
<template>
  <div id="app">
    <el-container :style="{ height: winHeight + 'px' }">
      <el-aside width="200px">
        <el-menu :router="true">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>起始页面</template
            >
            <el-menu-item index="/">欢迎页面</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-menu"></i>舆情报告</template
            >
            <el-menu-item index="/report">全部舆情</el-menu-item>
            <el-menu-item index="2-2">正面舆情</el-menu-item>
            <el-menu-item index="2-2">负面舆情</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-setting"></i>舆情设置</template
            >
            <el-menu-item index="/keywords">舆情关键词设置</el-menu-item>
            <el-menu-item index="/alarm">舆情警报设置</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container class="main-container">
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'electron-project',
  data () {
    return {
      winHeight: '' // 窗口高度
    }
  },
  mounted () {
    window.onresize = () => {
      this.winHeight = document.documentElement.clientHeight
    }
  }
}
</script>

<style lang="scss">
@import './assets/css/common.scss';
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
/* CSS */
.el-container {
  width: 100%;
  .el-aside {
    height: 100%;
    background-color: $defaultBgColor;
    .el-menu {
      background-color: $defaultBgColor;
    }
  }
  .main-container {
    background-color: $defaultBgColor;
  }
}
</style>
