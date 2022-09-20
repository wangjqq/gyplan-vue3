<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" :ellipsis="false" router>
        <el-menu-item index="/GyStation">顾渊工作站</el-menu-item>
        <el-menu-item index="/GyStation/GyStationIMS">元器件管理系统</el-menu-item>

        <div class="flex-grow" />

        <el-menu-item index="/Login">登录</el-menu-item>
        <el-menu-item index="1">注册</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive } from 'vue'
const activeIndex = ref('/GyStation') //顶部导航菜单索引
const handleSelect = (key: string, keyPath: string) => {
  activeIndex.value = key
  // this.addTab(key);
}
</script>
<style>
.flex-grow {
  flex-grow: 1;
}
</style>