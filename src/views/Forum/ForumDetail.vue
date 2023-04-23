<template>
  <div class="content">
    <header>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/Forum' }"
          >论坛主页</el-breadcrumb-item
        >
        <el-breadcrumb-item v-if="type">{{ type.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </header>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
let data = route.params
console.log(data)
const type = ref<any>()

const typeList = JSON.parse(localStorage.getItem('forumTypeList') || '')

type.value = typeList.filter((item: any) => {
  return item.id == data.id
})[0]
</script>
<style></style>
