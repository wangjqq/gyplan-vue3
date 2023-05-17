<template>
  <router-view v-if="!_isMobile()" />
  <Phone v-else />
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive } from 'vue'
import Phone from '@/components/Phone.vue'
const _isMobile = () => {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
  return flag
}
</script>
<style></style>
