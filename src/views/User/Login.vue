<template>
  <div class="login">
    <div class="from-box">
      <div class="login-title">
        <!-- 云学习后台管理系统 -->
        <el-icon :size="120" color="#fff">
          <Help />
        </el-icon>
      </div>

      <el-form ref="ruleFormRef" class="login-from" label-position="right" label-width="80px" :model="formLabelAlign" style="max-width: 400px" :rules="rules">
        <el-form-item label="账号:" prop="username">
          <el-input size="default" maxlength="18" v-model="formLabelAlign.username" />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input size="default" maxlength="18" type="password" v-model="formLabelAlign.password" show-password />
        </el-form-item>
        <el-form-item label="验证码:" prop="code">
          <el-input prefix-icon="el-icon-circle-check" placeholder="验证码" v-model="formLabelAlign.code" style="width: 40%; float: left"></el-input>
          <div class="code-css" @click="getcode">
            <img :src="imageUrl" style="width: 120px; margin-left: 20px; height: 35px" alt="code" />
          </div>
        </el-form-item>
        <el-button type="primary" size="large" class="loginbtn" @click="submitForm(ruleFormRef)">注册</el-button>
        <el-button type="primary" size="large" class="loginbtn" @click="submitLoginForm(ruleFormRef)">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
    
<script lang="ts" setup>
import { Help, Tools } from '@element-plus/icons-vue'
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
    { required: true, message: 'Please input username', trigger: 'blur' },
    { min: 4, max: 15, message: 'Length should be 4 to 15', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 4, max: 15, message: 'Length should be 4 to 15', trigger: 'blur' }
  ],
  code: [{ required: true, message: 'Please input password', trigger: 'blur' }]
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
</script>
    
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../../assets/bg.webp');
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .from-box {
    background-color: #fff;
    border-radius: 5px;

    & .login-title {
      height: 120px;
      padding: 10px 0;
      background-color: #5c72ff;
      border-radius: 5px 5px 0 0;
      margin-bottom: 15px;
      text-align: center;
    }
  }

  & .login-from {
    width: 460px;
    border-radius: 5px;
    padding-bottom: 30px;
    padding: 20px 35px 20px 20px;

    & .loginbtn {
      display: block;
      width: 96%;
      margin: 10px auto;
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
</style>
    