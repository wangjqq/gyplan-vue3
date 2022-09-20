<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="首页" name="首页">首页</el-tab-pane>
    <el-tab-pane label="顾渊工作站" name="/GyStation">顾渊工作站</el-tab-pane>
    <el-tab-pane label="顾渊知识站" name="顾渊知识站">顾渊知识站</el-tab-pane>
    <el-tab-pane label="顾渊商城" name="顾渊商城">顾渊商城</el-tab-pane>
    <el-tab-pane label="快客租房" name="快客租房">快客租房</el-tab-pane>
    <el-tab-pane label="码表管理系统" name="码表管理系统">码表管理系统</el-tab-pane>
    <el-tab-pane label="商城管理系统" name="商城管理系统">商城管理系统</el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import router from '@/router/index'

const activeName = ref('首页')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.props.name, event)
  const flag: any = tab.props.name
  router.push(flag)
}
</script>
<style>
</style>