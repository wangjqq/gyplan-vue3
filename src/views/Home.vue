<template>
  <el-container style="height: 100vh; width: 100%">
    <el-header style="flex-shrink: 0">
      <el-menu
        :default-active="activeName"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        router
      >
        <el-menu-item
          ><img src="../assets/imgs/logo.png" alt=""
        /></el-menu-item>
        <el-menu-item index="/Home">首页</el-menu-item>
        <!-- <el-menu-item index="/GyStation">顾渊工作站</el-menu-item> -->
        <el-sub-menu index="/GyStationIMS">
          <template #title>顾渊工作站</template>
          <el-menu-item index="/GyStationIMS">元器件管理系统</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/Arithmetic">
          <template #title>顾渊知识站</template>
          <el-menu-item index="/Arithmetic">知识点/题目管理系统</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/ShopIndex">顾渊商城</el-menu-item>
        <el-menu-item index="1">商城管理系统</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="/Login" v-if="loginFlag == false"
          >你好,请登录</el-menu-item
        >
        <el-menu-item
          index="/Register"
          style="color: red"
          v-if="loginFlag == false"
          >免费注册</el-menu-item
        >
        <el-sub-menu index="/Login" v-if="loginFlag == true" class="user">
          <template #title
            ><img
              :src="imgUrl"
              alt=""
              style="width: 40px; height: 40px"
            />欢迎你! {{ username }}</template
          >
          <el-menu-item index="/UserCenter">个人中心</el-menu-item>
          <el-menu-item index="/Home" @click="loginOut()"
            >退出登录</el-menu-item
          >
        </el-sub-menu>
      </el-menu>
    </el-header>
    <el-main
      style="
        width: 100%;
        padding: 0;
        height: 100%;
        background-color: rgb(244, 245, 245);
        flex: 1;
      "
    >
      <Carousel v-if="router.currentRoute.value.fullPath == '/Home'"></Carousel>
      <router-view></router-view>
    </el-main>
  </el-container>
  <Footer v-if="router.currentRoute.value.fullPath == '/Home'"></Footer>
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive } from "vue";
import type { TabsPaneContext, Action } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import router from "@/router/index";
import { isLogin, logOut } from "@/api/User";
import Carousel from "@/components/Carousels.vue";
import Footer from "@/components/Footer.vue";

// const router = useRouter()
const activeName = ref("/Home");
const imgsName = ref([
  "../assets/imgs/swiper1.png",
  "../assets/imgs/swiper2.png",
  "../assets/imgs/swiper3.png",
  "../assets/imgs/swiper4.png",
]);
const loginFlag = ref(false);
const username: any = ref("");
const imgUrl = ref("");

if (router.currentRoute.value.fullPath != "/Home") {
  activeName.value = router.currentRoute.value.fullPath;
}
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.props.name, event);
  const flag: any = tab.props.name;
  router.push(flag);
};
const getIsLogin = async () => {
  let data = await isLogin();
  let time = 5;
  if (data.status == 202 || data.status == 201) {
    loginFlag.value = false;
    ElMessageBox.alert(
      `您还未登录,登陆后即可使用本站全部功能,${time}秒后将为您自动跳转至登陆页面.`,
      "提示",
      {
        confirmButtonText: "去登录",
        callback: (action: Action) => {
          clearTimeout(timer1);
          router.push("/Login");
        },
      }
    );

    let timer1 = setTimeout(() => {
      ElMessageBox.close();
      router.push("/Login");
    }, 5000);
  } else {
    window.localStorage.setItem("logindata", JSON.stringify(data.data[0]));
    loginFlag.value = true;
    const local: any = window.localStorage.getItem("logindata");
    username.value = JSON.parse(local).phoneNumber;
    imgUrl.value = JSON.parse(local).userPic;
  }
};
getIsLogin();

const loginOut = async () => {
  let data = await logOut();
  loginFlag.value = false;
  window.localStorage.removeItem("logindata");
  ElMessage("已退出登录");
};
</script>
<style scoped>
:deep(.el-carousel__container) {
  height: 500px;
}

.flex-grow {
  flex-grow: 1;
}

:deep(.user .el-menu--horizontal > .el-sub-menu .el-sub-menu__title) {
  color: red;
}

.el-carousel__item .img {
  width: 100%;
  height: inherit;
}
</style>