<template>
  <h2>
    {{ newContent.news_title }}
  </h2>
  <div class="content" v-html="newContent.news_content"></div>
</template>
<script lang="ts" setup>
import { getNewContentById } from '@/api/News'
import { defineComponent, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'

interface INew {
  id: number
  keywords: string
  news_author: string
  news_category: string
  news_content: string
  news_source: string
  news_title: string
  pic: string
  publish_time: string
}

const route = useRoute()
const newContent = ref<Partial<INew>>({})
let data = route.params

getNewContentById(data).then(({ data }) => {
  data[0].news_content = data[0].news_content.split(/\r\n/g).join('\r\t')
  newContent.value = data[0]
})
//params
</script>
<style scoped lang="less">
h2 {
  text-align: center;
}
.content {
  white-space: pre-wrap;
  width: 900px;
  margin: 0 auto;
  margin-bottom: 50px;
}
</style>
