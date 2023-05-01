import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Home',
  },
  {
    path: '/Login',
    name: '登录',
    component: () => import('../views/User/Login.vue'),
  },
  {
    path: '/Register',
    name: '注册',
    component: () => import('../views/User/Register.vue'),
  },

  {
    path: '/Home',
    name: '主页',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/NewContent/:id',
        name: '新闻详情',
        component: () => import('../views/News/NewContent.vue'),
      },
      {
        path: '/UserCenter',
        name: '个人中心',
        component: () => import('../views/User/UserCenter.vue'),
      },
      {
        path: '/GyStationIMS',
        name: '顾渊工作站',
        component: () => import('../views/GyStation/GyStationIMS.vue'),
      },
      {
        path: '/GyStationIMS/Use',
        name: '查看使用情况',
        component: () => import('../views/GyStation/GyStationIMSUse.vue'),
      },
      {
        path: '/Arithmetic',
        name: '顾渊知识站',
        component: () => import('../views/GyKnowledge/Arithmetic.vue'),
      },
      {
        path: '/ShopIndex',
        redirect: '/Shop/EmbeddedSoftware',
        name: '顾渊商城',
        component: () => import('../views/Shop/ShopIndex.vue'),
        children: [
          {
            path: '/Shop/EmbeddedSoftware',
            name: '嵌入式软件开发',
            component: () => import('../views/Shop/EmbeddedSoftware.vue'),
          },
          {
            path: '/Shop/PureSoftware',
            name: '纯软件开发',
            component: () => import('../views/Shop/PureSoftware.vue'),
          },
          {
            path: '/Shop/Schematic',
            name: '嵌入式硬件开发',
            component: () => import('../views/Shop/Schematic.vue'),
          },
          {
            path: '/Shop/Printing',
            name: '3d打印',
            component: () => import('../views/Shop/Printing.vue'),
          },
          {
            path: '/Shop/Order',
            name: '下单',
            component: () => import('../views/Shop/Order.vue'),
          },
        ],
      },
      {
        path: '/Forum',
        name: '论坛',
        component: () => import('../views/Forum/ForumIndex.vue'),
      },
      {
        path: '/ForumList/:id',
        name: '分类列表',
        component: () => import('../views/Forum/ForumList.vue'),
      },
      {
        path: '/ForumDetail/:forumId',
        name: '帖子详情',
        component: () => import('../views/Forum/ForumDetail.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
