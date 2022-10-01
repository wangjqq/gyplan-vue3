<template>
  <div class="user-view">
    <div class="user-info-block">
      <el-avatar class="head" :size="100" shape="circle" :src="imgUrl" />
      <p class="username">{{ username }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive } from 'vue'

const imgUrl = ref('')
const username = ref('')
const local: any = window.localStorage.getItem('logindata')
imgUrl.value = JSON.parse(local).user_pic

if (window.localStorage.getItem('logindata')) {
  username.value = JSON.parse(local).username
}
</script>
<style lang="less" scoped>
.user-info-block {
  width: 700px;
  height: 500px;
  margin: 0 auto;
  background-color: white;
  .head {
    float: left;
    margin: 30px;
  }
  .username {
    font-size: 30px;
    float: left;
  }
}
</style>