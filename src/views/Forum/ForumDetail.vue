<template>
  <div class="content">
    <header>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/Forum' }">论坛主页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-if="type"
          :to="{ path: `/ForumList/${type.id}` }"
          style="cursor: pointer !important"
          class="last"
          >{{ type.name }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </header>
    <body>
      <p class="title">{{ forumFirst.title }}</p>
      <div class="forum-first">
        <div class="forum-userInfo">
          <div class="louzhubiaoshi"></div>
          <img :src="forumFirst.authorPic" />
          <p>{{ forumFirst.authorName }}</p>
        </div>
        <div class="forum-first-content">
          <p>{{ forumFirst.content }}</p>
          <div class="footer">
            <span> 1楼</span>
            <span>{{ myformatdate(forumFirst.creationTime) }}</span>
            <span
              >查看:{{ forumFirst.view }} <el-icon size="20" color="#7a7a7a"> <View /></el-icon
            ></span>
            <span>点赞:{{ forumFirst.likes }}<Svg @click="likes()" style="cursor: pointer"></Svg></span>
            <span style="cursor: pointer" @click="open('-1')" v-if="userInfo.id == forumFirst.authorId"
              >删除帖子<el-icon><Delete /></el-icon
            ></span>
          </div>
        </div>
      </div>
      <div v-for="(item, index) in forumReplyList" class="forum-reply-list">
        <div class="forum-userInfo">
          <img :src="item.replyPic" />
          <p>{{ item.replyName }}</p>
        </div>
        <div class="forum-first-content">
          <p>{{ item.content }}</p>
          <div class="footer">
            <span> {{ (page - 1) * size + index + 2 }}楼</span>
            <span>{{ item.replyTime }}</span>
            <span>点赞:{{ item.likes }}<Svg @click="toLikesForum(item)" style="cursor: pointer"></Svg></span>
            <span style="cursor: pointer" @click="open(item.id)" v-if="userInfo.id == item.replyId"
              >删除回复<el-icon><Delete /></el-icon
            ></span>
          </div>
        </div>
      </div>
    </body>
    <div class="reply">
      <p class="reply-title">发表回复</p>
      <el-input class="reply-input" v-model="textarea" :rows="6" type="textarea" show-word-limit maxlength="300" />
      <el-button type="primary" class="reply-btn" @click="postReply()">发表</el-button>
    </div>
    <el-pagination
      v-if="show"
      v-model:current-page="page"
      v-model:page-size="size"
      :page-sizes="[5, 10, 20, 100]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      layout="sizes,prev, pager, next,jumper"
      :total="total" />
  </div>
  <el-dialog v-model="dialogVisible" title="你好!" width="30%">
    <span>发帖前请先设置昵称噢~</span>
    <el-input style="margin: 10px 0" v-model="nickName" placeholder="请输入昵称" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="setNickName()"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  replyForum,
  getForumReplyList,
  getForumContentById,
  viewForum,
  likesForum,
  delForum,
  delReply,
} from '@/api/Forum'
import { ElMessage, ElMessageBox } from 'element-plus'
import Svg from './Svg.vue'
import { setUserInfo, isLogin } from '@/api/User'
const router = useRouter()
const route = useRoute()
const type = ref<any>()
const forumFirst = ref<any>({})
const forumReplyList = ref<any>([])
const show = ref(false)
const page = ref(1)
const size = ref(10)
const total = ref(0)
const textarea = ref('')
const nickName = ref('')
const dialogVisible = ref(false)
const userInfo = ref<any>({})

let data = route.params

function myformatdate(inputTime: any) {
  if (!inputTime && typeof inputTime !== 'number') {
    return ''
  }
  var localTime = ''
  inputTime = new Date(inputTime).getTime()
  const offset = new Date().getTimezoneOffset()
  localTime = new Date(inputTime - offset * 60000).toISOString()
  localTime = localTime.substr(0, localTime.lastIndexOf('.'))
  localTime = localTime.replace('T', ' ')
  return localTime
}

const typeList = JSON.parse(localStorage.getItem('forumTypeList') || '')
getForumContentById({ id: data.forumId }).then(({ data: data1 }) => {
  type.value = typeList.filter((item: any) => {
    return item.id == data1[0].typeId
  })[0]
  data1[0].view++
  forumFirst.value = data1[0]
  let formData = new FormData()
  formData.append('id', data.forumId.toString())
  formData.append('view', forumFirst.value.view)
  viewForum(formData)
})

const getReplyList = () => {
  getForumReplyList({
    fid: data.forumId,
    page: page.value,
    size: size.value,
  }).then(({ data }) => {
    if (data.total <= 10) {
      show.value = false
    } else {
      show.value = true
    }
    forumReplyList.value = data.results
    total.value = data.total
  })
}
getReplyList()

const handleSizeChange = (e: any) => {
  size.value = e
  getReplyList()
}

const handleCurrentChange = (e: any) => {
  page.value = e
  getReplyList()
}

const likes = () => {
  let formData = new FormData()
  formData.append('id', data.forumId.toString())
  formData.append('likes', (++forumFirst.value.likes).toString())
  viewForum(formData)
}

const toLikesForum = (item: any) => {
  let formData = new FormData()
  formData.append('id', item.id.toString())
  formData.append('likes', (++item.likes).toString())
  likesForum(formData)
}

userInfo.value = JSON.parse(localStorage.getItem('logindata') || '')

const setNickName = async () => {
  var patt = /^[\u4e00-\u9fa5_a-zA-Z0-9-]{1,12}$/
  if (patt.test(nickName.value)) {
    let formData = new FormData()
    formData.append('id', userInfo.value.id)
    formData.append('dueTime', userInfo.value.dueTime)
    formData.append('email', userInfo.value.email)
    formData.append('isLogin', userInfo.value.isLogin)
    formData.append('loginNum', userInfo.value.loginNum)
    formData.append('loginTime', userInfo.value.loginTime)
    formData.append('nickName', nickName.value)
    formData.append('phoneNumber', userInfo.value.phoneNumber)
    formData.append('qqNumber', userInfo.value.qqNumber)
    formData.append('sessionID', userInfo.value.sessionID)
    formData.append('userPic', userInfo.value.userPic)
    await setUserInfo(formData)
    let data = await isLogin()
    window.localStorage.setItem('logindata', JSON.stringify(data.data[0]))
  } else {
    alert('只能输入中文英文大小写数字_-,最大12位')
    return
  }
  dialogVisible.value = false
}

const postReply = async () => {
  console.log(userInfo)
  if (!userInfo.value.nickName) {
    dialogVisible.value = true
    return
  }
  let myDate = new Date()
  let formData = new FormData()
  formData.append('fid', data.forumId as string)
  formData.append('content', textarea.value)
  formData.append('replyId', userInfo.value.id)
  formData.append('replyName', userInfo.value.nickName)
  formData.append('replyTime', myDate.toLocaleString())
  formData.append('replyPic', userInfo.value.userPic)
  await replyForum(formData)
  ElMessage({
    message: '发表成功!',
    type: 'success',
  })
  getReplyList()
  textarea.value = ''
}
const delForum1 = async () => {
  let formData = new FormData()
  formData.append('id', forumFirst.id)
  await delForum(formData)
}

const delReply1 = async (id: string) => {
  let formData = new FormData()
  formData.append('id', id)
  await delReply(formData)
}

const open = (type1: string) => {
  ElMessageBox.confirm('删除后无法恢复,确认删除?', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      if (type1 == '-1') {
        await delForum1()
        router.push({
          path: `/ForumList/${type.value.id}`,
        })
      } else {
        await delReply1(type1)
        getReplyList()
      }
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
</script>
<style scoped lang="less">
.content {
  width: 1000px;
  margin: 20px auto;

  .el-breadcrumb__item :hover {
    cursor: pointer !important;
    color: #0099ee;
  }
  body {
    background-color: #fff;
    .title {
      height: 56px;
      line-height: 56px;
      font-size: 16px;
      font-weight: 400;
      padding-left: 20px;
      margin: 0;
      border-bottom: 1px solid #bbbdbf;
    }
    .forum-first {
      display: flex;
      min-height: 300px;
      border-bottom: 1px solid #bbbdbf;
      .forum-userInfo {
        width: 130px;
        background-color: #fafbfc;
        position: relative;
        .louzhubiaoshi {
          background: url(@/assets/imgs/pb_css_pic.png) no-repeat -172px -120px;
          position: absolute;
          width: 36px;
          height: 36px;
          top: 0px;
          right: 0;
          border: 0 solid red;
        }
        img {
          display: block;
          margin: 30px auto;
        }
        p {
          margin: 0 5px;
          color: #2d64b3;
          text-align: center;
          overflow: hidden; /*超出部分隐藏*/
          text-overflow: ellipsis; /* 超出部分显示省略号 */
          white-space: nowrap; /*规定段落中的文本不进行换行 */
        }
      }
      .forum-first-content {
        position: relative;
        width: 800px;
        p {
          margin: 25px;
          white-space: pre-wrap;
        }
        .footer {
          color: #999;
          font-size: 13px;
          position: absolute;
          bottom: 10px;
          right: 0px;
          span {
            margin-right: 10px;
          }
        }
      }
    }
    .forum-reply-list {
      display: flex;
      height: 200px;
      border-bottom: 1px solid #bbbdbf;
      .forum-userInfo {
        width: 130px;
        background-color: #fafbfc;
        position: relative;
        img {
          display: block;
          margin: 30px auto;
        }
        p {
          margin: 0 5px;
          color: #2d64b3;
          text-align: center;
          overflow: hidden; /*超出部分隐藏*/
          text-overflow: ellipsis; /* 超出部分显示省略号 */
          white-space: nowrap; /*规定段落中的文本不进行换行 */
        }
      }
      .forum-first-content {
        position: relative;
        width: 800px;
        p {
          margin: 10px;
          height: 160px;
          overflow-y: hidden; /*超出部分隐藏*/
          white-space: pre-wrap;
        }
        .footer {
          color: #999;
          font-size: 13px;
          position: absolute;
          bottom: 10px;
          right: 0px;
          span {
            margin-right: 10px;
          }
        }
      }
    }
  }
  .reply {
    position: fixed;
    top: 40%;
    right: 50px;
    width: 20%;
    height: 300px;
    background-color: #fff;
    box-shadow: 0 10px 10px rgba(26, 26, 26, 0.1) !important;
    .reply-title {
      margin: 0;
      padding: 10px;
      border-bottom: 1px solid #bbbdbf;
    }
    .reply-input {
      margin: 20px;
      width: 90%;
    }
    .reply-btn {
      margin: 0 20px;
      position: absolute;
      right: 0;
    }
  }
}
</style>
