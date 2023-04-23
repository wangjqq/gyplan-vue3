<template>
  <div v-if="newContent">
    <h2>
      {{ newContent.news_title }}
    </h2>
    <div class="title">
      <el-space>
        <span>{{ newContent.publish_time }}</span>
        <span>来源:{{ newContent.news_source }}</span>
        <span>作者:{{ newContent.news_author }}</span>
        <el-icon size="16" color="#7a7a7a"> <View /></el-icon>
        <span> {{ newContent.view }} </span>
        <el-icon
          size="16"
          color="#7a7a7a"
          @click="like(newContent)"
          style="cursor: pointer"
          title="点赞"
          ><Pointer
        /></el-icon>
        <span> {{ newContent.likes }} </span>
      </el-space>
    </div>
    <div class="content" v-html="newContent.news_content"></div>
  </div>
</template>
<script lang="ts" setup>
import { getNewContentById, viewNews, likesNews } from '@/api/News'
import { ref } from 'vue'
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
  view: number
  likes: number
}

const route = useRoute()
const newContent = ref<Partial<INew>>({})
let data = route.params

let view = 0

getNewContentById(data).then(({ data: data1 }) => {
  view = data1[0].view + 1
  let formData = new FormData()
  formData.append('id', data.id as string)
  formData.append('view', view.toString())
  viewNews(formData).then((res) => {
    getNewContentById(data).then(({ data }) => {
      data[0].news_content = data[0].news_content.split(/\r\n/g).join('\r\t')
      newContent.value = data[0]
    })
  })
})

const like = async (newContent1: any) => {
  let formData = new FormData()
  formData.append('id', newContent1.id.toString())
  formData.append('likes', (newContent1.likes + 1).toString())
  await likesNews(formData)
  getNewContentById(data).then(({ data }) => {
    data[0].news_content = data[0].news_content.split(/\r\n/g).join('\r\t')
    newContent.value = data[0]
  })
}
</script>
<style scoped lang="less">
h2 {
  text-align: center;
}
.title {
  margin: 0 auto;
  width: 600px;
  color: #7a7a7a;
}
.content {
  white-space: pre-wrap;
  width: 900px;
  margin: 0 auto;
  margin-bottom: 50px;
}
</style>
