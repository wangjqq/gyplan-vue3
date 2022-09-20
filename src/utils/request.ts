import axios from "axios"
import {
  ElMessage
} from 'element-plus'
const request = axios.create({
  baseURL: "http://127.0.0.1:3007",
  // baseURL: "http://119.91.65.198:3000",
  timeout: 5000
})

// response interceptor响应拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    ElMessage({
      showClose: true,
      message: error.message,
      type: 'error',
    })
    return Promise.reject(error);
  }
);

export { request };