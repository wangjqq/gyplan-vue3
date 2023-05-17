<template>
  <el-carousel class="car" type="card">
    <el-carousel-item v-for="(banner, index) in banners" :key="index" interval="4000"
      ><img :src="banner.url" alt="banner" class="banner" @click="router.push(banner.toUrl)" />
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts" setup>
import toUrl from '../utils/hooks'
import { defineComponent, ref, reactive } from 'vue'
import router from '@/router/index'

const banners = ref([
  {
    url: require('../assets/imgs/swiper1.png'),
    toUrl: '/GyStationIMS',
  },
  {
    url: require('../assets/imgs/swiper2.png'),
    toUrl: '/Arithmetic',
  },
  {
    url: require('../assets/imgs/swiper3.png'),
    toUrl: '/Shop/Schematic',
  },
  {
    url: require('../assets/imgs/swiper4.png'),
    toUrl: '/Shop/EmbeddedSoftware',
  },
])
</script>

<style>
.car {
  width: 100%;
  margin: 0 auto;
}

.banner {
  width: 100%;
  height: 100%;
  opacity: 0.7;
}

.car .is-active {
  /* box-shadow: 0 -10px 10px #666; */
  position: relative;
  z-index: 99;
}

.car .is-active img {
  opacity: 1;
}
</style>
