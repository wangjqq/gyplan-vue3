<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect" router>
        <el-menu-item index="/Home"><img src="../../assets/imgs/logo.png" alt="" /></el-menu-item>
        <el-menu-item index="/Login" style="font-size: 20px">登录</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="/Home">首页</el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="login">
      <div class="pic"></div>
      <div>
        <div class="from-box">
          <div class="login-title">账号登录</div>
          <el-form ref="ruleFormRef" class="login-from" label-position="right" :model="formLabelAlign" style="max-width: 400px" :rules="rules" :hide-required-asterisk="true">
            <el-form-item label="" prop="username">
              <el-input size="default" maxlength="18" v-model="formLabelAlign.username" style="height: 50px" placeholder="手机号/邮件地址/帐号名" :prefix-icon="User" />
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input size="default" maxlength="18" type="password" v-model="formLabelAlign.password" show-password style="height: 50px" placeholder="密码" :prefix-icon="Lock" />
            </el-form-item>
            <el-form-item label="" prop="code">
              <el-input placeholder="验证码" v-model="formLabelAlign.code" style="width: 40%; float: left; height: 50px" :prefix-icon="Key"></el-input>
              <div class="code-css" @click="getcode">
                <img :src="imageUrl" style="width: 120px; margin-left: 20px; height: 50px" alt="code" />
              </div>
            </el-form-item>
            <!-- <el-button type="primary" size="large" class="loginbtn" @click="submitForm(ruleFormRef)">注册</el-button> -->
            <el-button type="primary" size="large" class="loginbtn" @click="submitLoginForm(ruleFormRef)">登录</el-button>
          </el-form>
          <div class="operation">
            <el-link type="info" style="margin-left: 5px" :underline="false" @click="goRegister">注册</el-link>
            <span>|</span>
            <el-link type="info" :underline="false">忘记密码</el-link>
          </div>
        </div>
      </div>
    </el-main>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>
    
<script lang="ts" setup>
import { User, Lock, Key } from '@element-plus/icons-vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElLoading, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { setToken } from '../../utils/auth'
import { Reguser, getCaptacha, Login } from '../../api/User'
import type { FormInstance, FormRules } from 'element-plus'
import { log } from 'console'
const router = useRouter()
let codeFlag = ref(true)
let formLabelAlign = reactive({ username: '', password: '', code: '' })
let ruleFormRef = ref<FormInstance>()
// 定义一个校验规则
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入手机号/邮件地址/帐号名', trigger: 'blur' },
    { min: 4, max: 15, message: 'Length should be 4 to 15', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 4, max: 15, message: 'Length should be 4 to 15', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 4, max: 4, message: '请完整输入验证码', trigger: 'blur' }
  ]
})
let loading: any
let imageUrl: any = ref()
// 是否加载动画
//注册
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading = ElLoading.service({
        lock: true,
        text: '注册中',
        background: 'rgba(0, 0, 0, 0.8)'
      })
    }
  })
  let formData = new FormData()
  formData.append('username', formLabelAlign.username)
  formData.append('password', formLabelAlign.password)
  formData.append('captcha', formLabelAlign.code)

  let data: any = await Reguser(formData)
  if (data.status == 200) {
    setTimeout(() => {
      loading.close()
      router.replace('/Login')
      ElMessage({
        message: `注册成功`,
        type: 'success'
      })
    }, 1000)
  } else {
    loading.close()
    ElMessage({
      message: `${data.message}`,
      type: 'warning'
    })
  }
}

//登录
const submitLoginForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading = ElLoading.service({
        lock: true,
        text: '登录中',
        background: 'rgba(0, 0, 0, 0.8)'
      })
    }
  })
  let formData = new FormData()
  formData.append('username', formLabelAlign.username)
  formData.append('password', formLabelAlign.password)
  formData.append('captcha', formLabelAlign.code)

  let data: any = await Login(formData)
  if (data.status == 200) {
    setTimeout(() => {
      loading.close()
      router.replace('/Home')
      ElMessage({
        message: `登录成功`,
        type: 'success'
      })
    }, 1000)
  } else {
    loading.close()
    ElMessage({
      message: `${data.message}`,
      type: 'warning'
    })
  }
}

async function getcode() {
  let data: any = await getCaptacha()
  let blob = new Blob([data]) // 返回的文件流数据
  // imageUrl.value = window.URL.createObjectURL(blob) // 将他转化为路径
  // console.log(data)
  // console.log(encodeURIComponent(data))
  imageUrl.value = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(data)
  console.log(imageUrl.value)
}
getcode()

const goRegister = () => {
  // router.push()
  router.push('/Register')
}
</script>
    
<style lang="less" scoped>
.login {
  width: 100%;
  height: 93vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../../assets/imgs/background_login.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .pic {
    width: 658px;
    height: 485px;
    background-image: url('../../assets/imgs/login.webp');
    margin-right: 200px;
  }
  .from-box {
    background-color: #fff;
    border-radius: 5px;

    & .login-title {
      height: 50px;
      padding: 50px 0 10px 0;
      font-size: 30px;
      background-color: #fff;
      border-radius: 5px 5px 0 0;
      // margin-bottom: 15px;
      text-align: center;
    }
  }

  & .login-from {
    width: 460px;
    border-radius: 5px;
    padding-bottom: 30px;
    padding: 20px 35px 0px 20px;

    & .loginbtn {
      display: block;
      width: 96%;
      margin: 10px 10px 10px 15px;
    }

    & .code-info {
      line-height: normal;

      & .input-code {
        width: 70%;
        min-width: 150px;
      }

      & .image-info {
        width: 30%;
        height: 32px;
      }
    }
  }
}
.flex-grow {
  flex-grow: 1;
}
:deep(.el-menu--horizontal) {
  border-bottom: none;
}
:deep(.el-form-item__content) {
  margin-left: 22px;
}
.operation {
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    font-size: 15px;
  }
  span {
    color: rgb(144, 147, 153);
    margin: 5px;
  }
}
</style>
    