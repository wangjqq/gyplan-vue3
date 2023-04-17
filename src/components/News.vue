<template>
  <div class="news">
    <el-row class="box" gutter="20">
      <el-col :span="6" :offset="1">
        <div class="content">
          <div class="title">
            <h2>工程师职场</h2>
          </div>
          <ul>
            <li v-for="item in newsList">
              {{ item.news_category === 'zhichang' ? item.news_title : '' }}
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="6" :offset="2">
        <div class="content">
          <div class="title"><h2>工程师创业</h2></div>
          <ul>
            <li v-for="item in newsList">
              {{ item.news_category === 'cuangye' ? item.news_title : '' }}
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="6" :offset="2">
        <div class="content">
          <div class="title"><h2>工程师创意</h2></div>
          <ul>
            <li v-for="item in newsList">
              {{ item.news_category === 'cuangyi' ? item.news_title : '' }}
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive } from 'vue'
import { getAllNewsList } from '@/api/News'

const newsList: any = ref([])

const getList = async () => {
  const { data } = await getAllNewsList()
  newsList.value = data
}
getList()
</script>
<style lang="less" scoped>
.news {
  width: 99%;
  .box {
    .content {
      border: 1px solid #c4c4c4;
      background-color: #ffffff;
      .title {
        color: red;
        padding-left: 45px;
        border-bottom: 1px solid #c4c4c4;
      }
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        li {
          cursor: pointer;
          background: url(../assets/imgs/list-icon.png) no-repeat -10px 0;
          line-height: 24px;
          text-indent: 15px;
          background-position: -10px -40px;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
