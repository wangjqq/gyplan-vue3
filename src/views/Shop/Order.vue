<template>
  <div class="chat">
    <p class="title">下单沟通室</p>
    <div  id="content">
      <p  v-for="item in list" :key="item">
      <div class="item" v-if="user.phoneNumber != item.phoneNumber">
        <img :src="item.pic" width="50" height="50" />
        <span class="item-userName">{{ item.phoneNumber }}</span>
        <p class="item-sanjiaoxin"></p>
        <span class="item-message">{{ item.message }}</span>
        <span class="item-date">{{ item.time }}</span>
      </div>
      <div class="item" v-else>
        <span class="item-userName1">{{ item.phoneNumber }}</span>
        <p class="item-sanjiaoxin1"></p>
        <span class="item-message1">{{ item.message }}</span>
        <span class="item-date1">{{ item.time }}</span>
        <img :src="item.pic" width="50" height="50" />
      </div>
      </p>
    </div>
    <div class="inputBox">
      <el-space>
        <el-input v-model="input" placeholder="请输入对话" />
        <el-button type="primary" @click="send()">发送</el-button></el-space>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive ,nextTick } from 'vue'
import { ElMessage } from 'element-plus'
const userInfo = JSON.parse(localStorage.getItem('logindata') || '')
const input = ref('')
const user = ref<any>(userInfo)
const list = ref<any>([])

var flag = true
// var content: any = document.getElementById('content');
// console.log(content)
// content.scrollTop = content?.scrollHeight;
    
if (window.WebSocket) {
  // 此处的 :8089 端口号 要与后端配置的一致
  var ws = new WebSocket('ws://localhost:8089')
  ws.onopen = function (e) {
    console.log('服务器连接成功')
    ElMessage({
      message: '服务器连接成功!',
      type: 'success',
    })
  }
  ws.onclose = function (e) {
    console.log('服务器连接关闭')
  }
  ws.onerror = function () {
    console.log('服务器连接出错')
  }
  ws.onmessage = function (e) {
    //接收服务器返回的数据
    let resData = JSON.parse(e.data)
    list.value = resData
    nextTick(() => {
      var content: any = document.getElementById('content');
      content.scrollTop = content.scrollHeight;
    })
  }
}

const send = () => {
  if (input.value.trim()) {
    const data = {
      phoneNumber: userInfo.phoneNumber,
      message: input.value,
      pic: userInfo.userPic,
    }
    ws.send(JSON.stringify(data))
    input.value=''
  }
}
</script>
<style scoped lang="less">
.chat {
  border: 1px solid #26b7d8;
  border-radius: 5%;
  position: relative;
  width: 600px;
  height: 1000px;
  margin: 0 auto;
  background-color: #fff;

  .title {
    color: #26b7d8;
    width: 180px;
    font-size: 30px;
    margin: 0 auto;
  }

  #content {
    height: 910px;
    overflow: auto;

    .item {
      position: relative;
      display: flex;
      margin: 10px;

      .item-userName {
        position: absolute;
        left: 80px;
      }

      .item-sanjiaoxin {
        position: absolute;
        width: 0;
        height: 0;
        border-right: 10px solid #f4f5f5;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        left: 61px;
        top: 25px;
      }

      .item-message {
        padding: 5px;
        border-radius: 3%;
        margin-left: 20px;
        margin-top: 25px;
        display: block;
        background-color: #f4f5f5;
        // height: 50px;
        line-height: 50px;
        font-size: 20px;
        // vertical-align: top;
        width: 500px;
      }

      .item-date {
        position: absolute;
        right: 30px;
        color: #000;
      }

      .item-userName1 {
        position: absolute;
        right: 80px;
      }

      .item-sanjiaoxin1 {
        position: absolute;
        width: 0;
        height: 0;
        border-left: 10px solid #f4f5f5;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        right: 55px;
        top: 25px;
      }

      .item-message1 {
        padding: 5px;
        border-radius: 3%;
        margin-right: 15px;        
        margin-top: 25px;
        display: block;
        background-color: #f4f5f5;
        // height: 50px;
        line-height: 50px;
        font-size: 20px;
        // vertical-align: top;
        width: 500px;
      }

      .item-date1 {
        position: absolute;
        left: 30px;
        color: #000;
      }
    }
  }

  .inputBox {
    position: fixed;
    bottom: 220px;
    left: 50%;
  }
}</style>
