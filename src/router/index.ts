import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Login',
    name: '登录',
    component: () => import("../views/User/Login.vue")
  },
  {
    path: '/Register',
    name: '注册',
    component: () => import("../views/User/Register.vue")
  },
  {
    path: '/Home',
    name: '主页',
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: '/UserCenter',
        name: '个人中心',
        component: () => import("../views/User/UserCenter.vue")
      },
    ]
  },
  {
    path: '/GyStation',
    name: '顾渊工作站',
    component: () => import("../views/GyStation/GyStation.vue"),
    children: [
      {
        path: '/GyStation/GyStationIMS',
        name: '元器件管理系统',
        component: () => import("../views/GyStation/GyStationIMS.vue")
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
