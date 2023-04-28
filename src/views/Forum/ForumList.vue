<template>
  <div class="content">
    <header>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/Forum' }">论坛主页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/ForumList/${type.id}` }"> {{ type.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </header>
    <body>
      <div class="title">
        <el-Space
          ><span :style="styleObject0" @click="checkList(0)" style="margin-left: 10px; font-size: 20px">最新主题</span>
          <!-- <span :style="styleObject1" @click="checkList(1)"
            ><el-icon :size="20"><GoldMedal /></el-icon>精华</span
          > -->
        </el-Space>
        <el-button type="primary" style="position: absolute; right: 0; top: 10px" @click="getNew()">发新帖</el-button>
      </div>
      <div class="content1" v-for="item in list">
        <p class="content1-title" @click="toDetail(item.id)">
          {{ item.title }}
        </p>
        <div style="display: flex; font-size: 12px; color: #999999">
          <el-Space>
            <p>{{ item.authorName }}</p>
            <p>*</p>
            <p>{{ myformatdate(item.creationTime) }} 发布</p>
            <p v-if="item.lastReplyName">⬅</p>
            <p v-if="item.lastReplyName">@{{ item.lastReplyName }}</p>
            <p v-if="item.lastReplyName">{{ myformatdate(item.lastReplyTime) }} 回复</p>
          </el-Space>
        </div>
      </div>
    </body>
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

  <el-dialog v-model="dialogVisible1" title="发新帖" width="30%">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon>
      <el-form-item label="帖子标题" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>
      <el-form-item label="帖子内容" prop="content">
        <el-input
          v-model="ruleForm.content"
          :autosize="{ minRows: 1, maxRows: 6 }"
          type="textarea"
          show-word-limit
          maxlength="3000"
      /></el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { defineComponent, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { setUserInfo, isLogin } from '@/api/User'
import { addForum, getForumListByType } from '@/api/Forum'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  title: '',
  content: '',
})

const rules = reactive<FormRules>({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 7, max: 50, message: '请输入7-50字符', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '请输入内容', trigger: 'blur' },
    { min: 7, max: 3000, message: '请输入7-3000字符', trigger: 'blur' },
  ],
})
const dialogVisible = ref(false)
const dialogVisible1 = ref(false)
const type = ref<any>()
const nickName = ref('')
const styleObject0 = ref<any>({ color: '#0099ee' })
const styleObject1 = ref<any>({})
const list = ref<any>([])

const route = useRoute()
let data = route.params

const typeList = JSON.parse(localStorage.getItem('forumTypeList') || '')

type.value = typeList.filter((item: any) => {
  return item.id == data.id
})[0]

const getList = () => {
  getForumListByType({ typeId: type.value.id }).then((res) => {
    list.value = res.data.reverse()
  })
}
getList()

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

const checkList = (flag: number) => {
  if (flag === 0) {
    styleObject0.value = { color: '#0099ee' }
    styleObject1.value = {}
  } else {
    styleObject1.value = { color: '#0099ee' }
    styleObject0.value = {}
  }
}
const userInfo = JSON.parse(localStorage.getItem('logindata') || '')
const getNew = () => {
  if (!userInfo.nickName) {
    dialogVisible.value = true
  } else {
    dialogVisible1.value = true
  }
}

const setNickName = async () => {
  var patt = /^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{1,12}$/
  if (patt.test(nickName.value)) {
    let formData = new FormData()
    formData.append('id', userInfo.id)
    formData.append('dueTime', userInfo.dueTime)
    formData.append('email', userInfo.email)
    formData.append('isLogin', userInfo.isLogin)
    formData.append('loginNum', userInfo.loginNum)
    formData.append('loginTime', userInfo.loginTime)
    formData.append('nickName', nickName.value)
    formData.append('phoneNumber', userInfo.phoneNumber)
    formData.append('qqNumber', userInfo.qqNumber)
    formData.append('sessionID', userInfo.sessionID)
    formData.append('userPic', userInfo.userPic)
    await setUserInfo(formData)
    let data = await isLogin()
    window.localStorage.setItem('logindata', JSON.stringify(data.data[0]))
  } else {
    alert('只能输入中文英文大小写数字_-,最大12位')
    return
  }
  dialogVisible.value = false
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let myDate = new Date()
      let formData = new FormData()

      formData.append('typeId', type.value.id)
      formData.append('title', ruleForm.title)
      formData.append('content', ruleForm.content)
      formData.append('authorId', userInfo.id)
      formData.append('authorName', userInfo.nickName)
      formData.append('authorPic', userInfo.userPic)
      formData.append('creationTime', myDate.toLocaleString())
      await addForum(formData)
      getList()
      ElMessage({
        message: '发新帖成功!',
        type: 'success',
      })
      formEl.resetFields()
      dialogVisible1.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}

const router = useRouter()
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
  body {
    margin: 20px 0;
    background-color: #fff;
    .title {
      margin: 0 10px;
      height: 50px;
      line-height: 50px;
      position: relative;
      span {
        cursor: pointer;
      }
    }
    .content1 {
      margin: 10px;
      padding: 0 10px;
      border-bottom: 1px solid #999999;
      .content1-title {
        margin: 0;
        cursor: pointer;
        &:hover {
          color: #0099ee;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
