<template>
  <div class="content">
    <header>
      <el-row :gutter="20">
        <el-col :span="11" :offset="1">
          <p class="list-title">
            <el-icon size="20" color="#0099ee"><DocumentCopy /></el-icon><span style="margin-left: 10px">最新帖子</span>
          </p>
          <ul>
            <li v-for="item in freshList" @click="toDetail(item.id)">
              <el-icon size="16" color="#0099ee"><Document /></el-icon
              ><span style="margin-left: 10px">{{ item.title }}</span>
            </li>
          </ul></el-col
        >
        <el-col :span="11">
          <p class="list-title">
            <el-icon size="20" color="#0099ee"><DocumentCopy /></el-icon>最新回复
          </p>
          <ul>
            <li v-for="item in replyList" @click="toDetail(item.fid)">
              <el-icon size="16" color="#0099ee"><Document /></el-icon
              ><span style="margin-left: 10px">{{ item.title }}</span>
            </li>
          </ul></el-col
        >
        <!-- <el-col :span="7">
          <p class="list-title">
            <el-icon size="20" color="#0099ee"><DocumentCopy /></el-icon>精华主题
          </p>
          <ul>
            <li>
              <el-icon size="16" color="#0099ee"><Document /></el-icon>[原创]华云安漏洞安全周报【第130期】
            </li>
            <li>
              <el-icon size="16" color="#0099ee"><Document /></el-icon>[原创]2023腾讯游戏安全竞赛决赛题解
            </li>
          </ul>
        </el-col> -->
      </el-row>
    </header>
  </div>
  <div class="content" v-if="typeList[0]">
    <div class="list1">
      <p class="title">问答园地</p>
      <el-row style="margin: 50px">
        <el-col :span="12" style="display: flex; cursor: pointer" @click="toList(1)">
          <img src="@/assets/forum/1.png" width="66" height="66" />
          <div style="margin: 10px">
            <el-space>
              <span>问答板块</span>
              <span>帖子:{{ typeList[0].number }}</span>
            </el-space>
            <div style="font-size: 12px; color: #858585">欢迎各位工程师在此板块交流问题</div>
          </div>
        </el-col>
        <el-col :offset="4" :span="8" style="display: flex; cursor: pointer" @click="toList(2)">
          <img src="@/assets/forum/2.png" width="66" height="66" />
          <div style="margin: 10px">
            <el-space>
              <span>资源下载</span>
              <span>帖子:{{ typeList[1].number }}</span>
            </el-space>
            <div style="font-size: 12px; color: #858585">硬件、软件工具或文档资料分享</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="list2">
      <p class="title">知识论坛</p>
      <el-row style="margin: 50px">
        <el-col :span="12" style="display: flex; cursor: pointer" @click="toList(3)">
          <img src="@/assets/forum/3.png" width="66" height="66" />
          <div style="margin: 10px">
            <el-space>
              <span>单片机/MCU</span>
              <span>帖子:{{ typeList[2].number }}</span>
            </el-space>
            <div style="font-size: 12px; color: #858585">有趣新颖的单片机作品，提高设计技能</div>
          </div>
        </el-col>
        <el-col :offset="4" :span="8" style="display: flex; cursor: pointer" @click="toList(4)">
          <img src="@/assets/forum/4.png" width="66" height="66" />
          <div style="margin: 10px">
            <el-space>
              <span>书籍学习与讨论</span>
              <span>帖子:{{ typeList[3].number }}</span>
            </el-space>
            <div style="font-size: 12px; color: #858585">来一起讨论硬件类书籍吧</div>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin: 50px">
        <el-col :span="12" style="display: flex; cursor: pointer" @click="toList(5)">
          <img src="@/assets/forum/5.png" width="66" height="66" />
          <div style="margin: 10px">
            <el-space>
              <span>物联网技术论坛</span>
              <span>帖子:{{ typeList[4].number }}</span>
            </el-space>
            <div style="font-size: 12px; color: #858585">Zigbee、蓝牙、RFID、WiFi、射频无线物联网技术</div>
          </div>
        </el-col>
        <el-col :offset="4" :span="8" style="display: flex; cursor: pointer" @click="toList(6)">
          <img src="@/assets/forum/6.png" width="66" height="66" />
          <div style="margin: 10px">
            <el-space>
              <span>Altium Protel论坛</span>
              <span>帖子:{{ typeList[5].number }}</span>
            </el-space>
            <div style="font-size: 12px; color: #858585">
              Altium Protel DXP 99e PCB设计软件功能讨论，layout布局布线经验交流
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
import { getForumTypeList, getFreshForum, getFreshReply } from '@/api/Forum'

const router = useRouter()
const typeList = ref<any>([])
const freshList = ref<any>([])
const replyList = ref<any>([])

const toList = (id: number) => {
  router.push({
    path: `/ForumList/${id}`,
  })
}

getFreshForum().then((res) => {
  freshList.value = res.data
})

getFreshReply().then((res) => {
  replyList.value = res.data
})

getForumTypeList().then((res) => {
  typeList.value = res.data
  localStorage.setItem('forumTypeList', JSON.stringify(res.data))
})

const toDetail = (id: number) => {
  router.push({
    path: `/ForumDetail/${id}`,
  })
}
</script>
<style scoped lang="less">
.content {
  width: 1000px;
  margin: 20px auto;
  header {
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1) !important;
    background-color: #fff;
    height: 200px;
    li {
      display: flex;
      margin-bottom: 4px;
      span {
        display: block;
        width: 300px;
        overflow: hidden; /*超出部分隐藏*/
        text-overflow: ellipsis; /* 超出部分显示省略号 */
        white-space: nowrap; /*规定段落中的文本不进行换行 */
      }
    }
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
