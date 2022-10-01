<template>
  <el-container style="width: 100vw; height: 100vh; display: flex">
    <el-header style="flex-shrink: 0">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect" router>
        <el-menu-item index="/Home"><img src="../assets/imgs/logo.png" alt="" /></el-menu-item>

        <el-menu-item index="/GyStation">顾渊工作站</el-menu-item>
        <el-menu-item index="1">顾渊知识站</el-menu-item>
        <el-menu-item index="1">顾渊商城</el-menu-item>
        <el-menu-item index="1">商城管理系统</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="/Login" v-if="loginFlag == false">你好,请登录</el-menu-item>
        <el-menu-item index="/Register" style="color: red" v-if="loginFlag == false">免费注册</el-menu-item>
        <el-sub-menu index="/Login" v-if="loginFlag == true">
          <template #title style="color: red"><img :src="imgUrl" alt="" style="width: 40px; height: 40px" />欢迎你! {{ username }}</template>
          <el-menu-item index="/UserCenter">个人中心</el-menu-item>
          <el-menu-item index="/Home" @click="loginOut()">退出登录</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-header>
    <el-main style="height: 700px; background-color: rgb(244, 245, 245); flex: 1">
      <!-- <iframe allow="microphone" width="350" height="430" src="https://tbp.cloud.tencent.com/tbp-h5-v2/?AgentId=butuR%2FWtpZR3%2Bx4PnNqqtjNhqn7J7rmKb4OQO0xLlJb%2FUP2OCSRVw78AozLXrCdJOZKfL6gZcCcswZ0e%2Fk3MFqNL12KE%2Fm27K3Zw19IE7nM%3D&ufc=&ubc=&bfc=&bbc=&tfc=&tbc="> </iframe> -->
      <el-carousel indicator-position="outside" style="height: 550px" v-if="router.currentRoute.value.fullPath == '/Home'">
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
      <router-view></router-view>
    </el-main>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
import { isLogin, logOut } from '@/api/User'

// const router = useRouter()
const activeName = ref('首页')
const imgsName = ref(['../assets/imgs/swiper1.png', '../assets/imgs/swiper2.png', '../assets/imgs/swiper3.png', '../assets/imgs/swiper4.png'])
const loginFlag = ref(false)
const username: any = ref('')
const imgUrl = ref('')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.props.name, event)
  const flag: any = tab.props.name
  router.push(flag)
}
const getIsLogin = async () => {
  let data = await isLogin()
  if (data.status == 202 || data.status == 201) {
    loginFlag.value = false
  } else {
    window.localStorage.setItem('logindata', JSON.stringify(data.data[0]))
    loginFlag.value = true
    imgUrl.value = JSON.parse(local).user_pic
  }
}
getIsLogin()

const local: any = window.localStorage.getItem('logindata')
if (window.localStorage.getItem('logindata')) {
  username.value = JSON.parse(local).username
}

const loginOut = async () => {
  let data = await logOut()
  loginFlag.value = false
  ElMessage('已退出登录')
}
</script>
<style scoped>
:deep(.el-carousel__container) {
  height: 500px;
}
.flex-grow {
  flex-grow: 1;
}
:deep(.el-menu--horizontal > .el-sub-menu .el-sub-menu__title) {
  color: red;
}
</style>