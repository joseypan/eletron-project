<!--
* @FileDescription: 波浪形状的loading组件
* @Author: 潘旭敏
* @Date: 2021-01-29
* @LastEditors: 潘旭敏
* @LastEditTime: 2021-01-29 15:29
 -->
<template>
  <div class="loading-container">
    <div class="loading-mask"></div>
    <div class="loading"></div>
    <div class="loading-text">加载中...</div>
  </div>
</template>
<script>
export default {
  name: 'LoadingWave'
}
</script>
<style lang="scss" scoped>
.loading-container {
  width: 100%;
  height: 100%;
}

.loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.4);
}

.loading {
  position: absolute;
  top: -webkit-calc(50% - (3rem)/ 2);
  left: -webkit-calc(50% - (3rem)/ 2);
  width: 3rem;
  height: 3rem;
  overflow: hidden;
  border-radius: 50%;
  background-color: rgb(48, 126, 241);
}

.loading::before {
  position: absolute;
  left: 50%;
  top: -20%;
  content: '';
  display: block;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 40%;
  background-color: #fff;
  z-index: 3;
}
.loading::after {
  position: absolute;
  left: 60%;
  top: -30%;
  content: '';
  display: block;
  width: 3rem;
  height: 3rem;
  border-radius: 40%;
  background-color: rgb(109, 163, 245);
}

.loading::before {
  animation: round 3s -2s infinite;
}

.loading::after {
  animation: round 3s infinite;
}
.loading-text {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  color: #bbb;
}
@keyframes round {
  0% {
    transform: translate(-50%, 0) rotateZ(0deg);
  }

  50% {
    transform: translate(-50%, 2%) rotateZ(-180deg);
  }

  100% {
    transform: translate(-50%, 0%) rotateZ(-360deg);
  }
}
</style>
