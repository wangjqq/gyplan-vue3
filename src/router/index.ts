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
      {
        path: '/GyStationIMS',
        name: '元器件管理系统',
        component: () => import("../views/GyStation/GyStationIMS.vue")
      },
      {
        path: '/Arithmetic',
        name: '顾渊知识站',
        component: () => import("../views/GyKnowledge/Arithmetic.vue")
      },
      {
        path: '/ShopIndex',
        name: '顾渊商城',
        component: () => import("../views/Shop/ShopIndex.vue"),
        children: [
          {
            path: '/Shop/EmbeddedSoftware',
            name: '嵌入式软件',
            component: () => import("../views/Shop/EmbeddedSoftware.vue")
          }
        ]
      }
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
