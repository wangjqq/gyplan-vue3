<template>
  <div class="content">
    <header>
      <el-row :gutter="20">
        <el-col :span="7" :offset="1">
          <p class="list-title">
            <el-icon size="20" color="#0099ee"><DocumentCopy /></el-icon
            >最新帖子
          </p>
          <ul>
            <li v-for="item in freshList">
              <el-icon size="16" color="#0099ee"><Document /></el-icon
              >{{ item.title }}
            </li>
          </ul></el-col
        >
        <el-col :span="7" :offset="1">
          <p class="list-title">
            <el-icon size="20" color="#0099ee"><DocumentCopy /></el-icon
            >最新回复
          </p>
          <ul>
            <li>
              <el-icon size="16" color="#0099ee"><Document /></el-icon
              >[原创]华云安漏洞安全周报【第130期】
            </li>
            <li>
              <el-icon size="16" color="#0099ee"><Document /></el-icon
              >[原创]2023腾讯游戏安全竞赛决赛题解
            </li>
          </ul></el-col
        >
        <el-col :span="7">
          <p class="list-title">
            <el-icon size="20" color="#0099ee"><DocumentCopy /></el-icon
            >精华主题
          </p>
          <ul>
            <li>
              <el-icon size="16" color="#0099ee"><Document /></el-icon
              >[原创]华云安漏洞安全周报【第130期】
            </li>
            <li>
              <el-icon size="16" color="#0099ee"><Document /></el-icon
              >[原创]2023腾讯游戏安全竞赛决赛题解
            </li>
          </ul>
        </el-col></el-row
      >
    </header>
  </div>
  <div class="content" v-if="typeList[0]">
    <div class="list1">
      <p class="title">学习园地</p>
      <el-row style="margin: 50px">
        <el-col
          :span="12"
          style="display: flex; cursor: pointer"
          @click="toList(1)">
          <img src="@/assets/forum/1.png" width="66" height="66" />
          <div style="margin: 10px">
            <el-space>
              <span>问答板块</span>
              <span>帖子:{{ typeList[0].number }}</span>
            </el-space>
            <div style="font-size: 12px; color: #858585">
              欢迎各位工程师在此板块交流问题
            </div>
          </div>
        </el-col>
        <el-col
          :offset="4"
          :span="8"
          style="display: flex; cursor: pointer"
          @click="toList(2)">
          <img src="@/assets/forum/2.png" width="66" height="66" />
          <div style="margin: 10px">
            <el-space>
              <span>资源下载</span>
              <span>帖子:{{ typeList[1].number }}</span>
            </el-space>
            <div style="font-size: 12px; color: #858585">
              硬件、软件工具或文档资料分享
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="list2">
      <p class="title">终端安全</p>
      <el-row style="margin: 50px">
        <el-col
          :span="12"
          style="display: flex; cursor: pointer"
          @click="toList(3)">
          <img src="@/assets/forum/3.png" width="66" height="66" />
          <div style="margin: 10px">
            <el-space>
              <span>Android安全</span>
              <span>帖子:{{ typeList[2].number }}</span>
            </el-space>
            <div style="font-size: 12px; color: #858585">
              Android系统逆向、对抗、加固、漏洞等
            </div>
          </div>
        </el-col>
        <el-col
          :offset="4"
          :span="8"
          style="display: flex; cursor: pointer"
          @click="toList(4)">
          <img src="@/assets/forum/4.png" width="66" height="66" />
          <div style="margin: 10px">
            <el-space>
              <span>智能设备</span>
              <span>帖子:{{ typeList[3].number }}</span>
            </el-space>
            <div style="font-size: 12px; color: #858585">
              讨论IoT智能设备安全威胁及防护技术
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin: 50px">
        <el-col
          :span="12"
          style="display: flex; cursor: pointer"
          @click="toList(5)">
          <img src="@/assets/forum/5.png" width="66" height="66" />
          <div style="margin: 10px">
            <el-space>
              <span>iOS安全</span>
              <span>帖子:{{ typeList[4].number }}</span>
            </el-space>
            <div style="font-size: 12px; color: #858585">
              iOS越狱、逆向技术交流
            </div>
          </div>
        </el-col>
        <el-col
          :offset="4"
          :span="8"
          style="display: flex; cursor: pointer"
          @click="toList(6)">
          <img src="@/assets/forum/6.png" width="66" height="66" />
          <div style="margin: 10px">
            <el-space>
              <span>密码应用</span>
              <span>帖子:{{ typeList[5].number }}</span>
            </el-space>
            <div style="font-size: 12px; color: #858585">
              密码学算法在安全方面的应用
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getForumTypeList, getFreshForum } from '@/api/Forum'

const router = useRouter()
const typeList = ref<any>([])
const freshList = ref<any>([])

const toList = (id: number) => {
  router.push({
    path: `/ForumList/${id}`,
  })
}

getFreshForum().then((res) => {
  freshList.value = res.data
})

getForumTypeList().then((res) => {
  typeList.value = res.data
  localStorage.setItem('forumTypeList', JSON.stringify(res.data))
})
</script>
<style scoped lang="less">
.content {
  width: 1000px;
  margin: 20px auto;
  header {
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1) !important;
    background-color: #fff;
  }

  .list1 {
    height: 200px;
    background-color: #fff;
    margin-bottom: 30px;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1) !important;
    .title {
      font-size: 18px;
      padding: 10px;
      border-bottom: 1px solid #e9ecef;
    }
  }
  .list2 {
    height: 300px;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1) !important;
    .title {
      font-size: 18px;
      padding: 10px;
      border-bottom: 1px solid #e9ecef;
    }
  }

  .list-title {
    font-size: 20px;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    li {
      cursor: pointer;
      overflow: hidden; /*超出部分隐藏*/
      text-overflow: ellipsis; /* 超出部分显示省略号 */
      white-space: nowrap; /*规定段落中的文本不进行换行 */
      &:hover {
        color: #0099ee;
        text-decoration: underline;
      }
    }
  }
}
</style>
