<template>
  <el-container>
    <el-aside width="220px" style="height: 100vh;">
      <div class="user">
        <el-avatar :size="50" :src="imgUrl"></el-avatar>
        <span class="username">{{username}}</span>
      </div>
      <el-menu class="el-menu-vertical-demo" :default-active="defaultActive" default-openeds="[9,10,11,12]" router>
        <el-sub-menu v-for="(item, index) in menumItem" :key="index" :index="item.index">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="(childrenItem, childrenIndex) in item.children" :key="index"
              :index="childrenItem.index">{{ childrenItem.title }}</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive, readonly, markRaw } from 'vue'
import { Cpu, Tickets, Files, Help } from '@element-plus/icons-vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const defaultActive = ref('/Shop/EmbeddedSoftware')//默认导航
const menumItem = readonly([
  {
    name: '软件产业',
    icon: markRaw(Tickets),
    index: '9',
    children: [
      { index: '/Shop/EmbeddedSoftware', title: '嵌入式软件开发' },
      { index: '/Shop/PureSoftware', title: '纯软件开发' }
    ]

  },
  {
    name: '硬件产业',
    icon: markRaw(Cpu),
    index: '10',
    children: [
      { index: '/Shop/Schematic', title: '原理图绘制' },
      { index: '4', title: 'PCB绘制' },
      { index: '14', title: 'PCB打样生产' },
    ]
  },
  {
    name: '其他产业',
    icon: markRaw(Files),
    index: '12',
    children: [
      { index: '13', title: '3D打印' },
    ]
  },
  {
    name: '更多菜单',
    icon: markRaw(Help),
    index: '11',
    children: [
      { index: '5', title: '优惠券中心' },
      { index: '6', title: '开票中心' },
      { index: '7', title: '售后服务' },
      { index: '8', title: '更多服务' },
    ]
  }
])//左侧菜单

const imgUrl = ref('')//用户头像
const username = ref('')//用户名
const local: any = window.localStorage.getItem('logindata')
username.value = JSON.parse(local).username
imgUrl.value = JSON.parse(local).user_pic
</script>

<style lang="less" scoped>
.user {
  background-color: #fff;

  .el-avatar {
    margin: 10px;
  }

  .username {
    position: relative;
    left: 10px;
    bottom: 15px;
    font-size: 20px;
  }
}
</style>