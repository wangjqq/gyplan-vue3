<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect" router>
        <el-menu-item index="/Home">LOGO</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="/GyStation">顾渊工作站</el-menu-item>
        <el-menu-item index="1">顾渊知识站</el-menu-item>
        <el-menu-item index="1">顾渊商城</el-menu-item>
        <el-menu-item index="1">商城管理系统</el-menu-item>
      </el-menu>
    </el-header>
    <el-main style="height: 700px">
      <el-carousel indicator-position="outside" style="height: 550px">
        <el-carousel-item style="height: 550px">
          <img src="../assets/imgs/swiper1.png" alt="" style="height: 550px" />
        </el-carousel-item>
        <el-carousel-item style="height: 550px">
          <img src="../assets/imgs/swiper2.png" alt="" />
        </el-carousel-item>
        <el-carousel-item style="height: 550px">
          <img src="../assets/imgs/swiper3.png" alt="" />
        </el-carousel-item>
        <el-carousel-item style="height: 550px">
          <img src="../assets/imgs/swiper4.png" alt="" />
        </el-carousel-item>
      </el-carousel>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import router from '@/router/index'

const activeName = ref('首页')
const imgsName = ref(['../assets/imgs/swiper1.png', '../assets/imgs/swiper2.png', '../assets/imgs/swiper3.png', '../assets/imgs/swiper4.png'])

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.props.name, event)
  const flag: any = tab.props.name
  router.push(flag)
}
</script>
<style scoped>
:deep(.el-carousel__container) {
  height: 500px;
}
</style>