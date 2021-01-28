<template>
  <div class="main">
    <el-container>
      <el-aside width="200px">
        <el-menu :router="true" :default-active="this.$route.path">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>起始页面</template
            >
            <el-menu-item index="/home">欢迎页面</el-menu-item>
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
<style lang="scss" scoped>
@import '@/assets/css/common.scss';
.main {
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: 100%;
    .el-aside {
      height: 100%;
      background-color: $defaultBgColor;
      .el-menu {
        background-color: $defaultBgColor;
      }
    }
    .main-container {
      background-color: $defaultBgColor;
      overflow-y: auto;
    }
  }
}
</style>
