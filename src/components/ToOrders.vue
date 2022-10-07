<template>
  <div class="orders">
    <img src="../assets/imgs/order.gif" alt="">
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive } from 'vue'
</script>
<style lang="less" scoped>
.orders {
  position: fixed;
  top: 50%;
  right: 300px;
  width: 100px;
  height: 300px;
  opacity: 0.9;
  cursor: pointer;

  // background-color: #fff;
  button {
    margin: 0 auto;
  }
}
</style>