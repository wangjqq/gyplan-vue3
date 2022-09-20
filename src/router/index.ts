import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Home',
    name: '主页',
    component: () => import("../views/Home.vue")
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
