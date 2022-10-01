<template>
  <el-container style="width: 100vw; height: 100vh; display: flex">
    <el-header style="flex-shrink: 0">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect" router>
        <el-menu-item index="/Home"><img src="../../assets/imgs/logo.png" alt="" /></el-menu-item>
        <el-menu-item index="/Register" style="font-size: 20px">注册</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="/Home">首页</el-menu-item>
      </el-menu>
    </el-header>
    <el-main style="background-color: rgb(241, 241, 241); flex: 1">
      <div class="registerForm" style="margin-top: 50px">
        <div class="registerTitle">
          <p style="float: left; margin-left: 20px">账号注册</p>
          <p style="float: right; margin-right: 20px">已有帐号,<span style="color: rgb(82, 110, 204); cursor: pointer" @click="router.push('/Login')">去登录></span></p>
        </div>
        <div class="regDetail">
          <el-form :model="form">
            <el-form-item label="">
              <el-input v-model="form.name" disabled>
                <template #prepend>国家/地区</template>
                <template #append>中国</template>
              </el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="form.phoneNum" placeholder="手机号">
                <template #prepend>+86(中国)</template>
              </el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="form.sms" placeholder="短信验证码">
                <template #append>获取验证码</template>
              </el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="form.password" type="password" placeholder="密码" show-password> </el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="form.checkPassword" type="password" placeholder="确认密码" show-password> </el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" size="large" class="loginbtn" @click="submitForm(ruleFormRef)">注册</el-button>
        </div>
      </div>
    </el-main>
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive } from 'vue'
import router from '@/router/index'
import { ElLoading, ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { Reguser } from '../../api/User'

const form: any = ref({
  phoneNum: '',
  sms: '',
  password: '',
  checkPassword: ''
})
let loading: any

const submitForm = async (formEl: FormInstance | undefined) => {
  // if (!formEl) return

  let formData = new FormData()
  formData.append('username', form.value.phoneNum)
  formData.append('password', form.value.password)
  // formData.append('captcha', form.code)
  let data: any = await Reguser(formData)
  if (data.status == 200) {
    setTimeout(() => {
      loading.close()
      router.replace('/Home')
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
</script>
<style lang="less" scoped>
.flex-grow {
  flex-grow: 1;
}
.registerForm {
  background-color: #fff;
  margin: 0 auto;
  width: 800px;
  height: 600px;
  .registerTitle {
    height: 50px;
    border-bottom: 1px solid rgb(241, 241, 241);
    font-size: 18px;
  }
}
.regDetail {
  margin: 0 auto;
  padding-top: 30px;
  width: 400px;
  .el-input {
    height: 40px;
  }
  & .loginbtn {
    display: block;
    width: 96%;
    margin: 10px 10px 14px 10px;
  }
  .el-form-item {
    margin-bottom: 30px;
  }
}
</style>