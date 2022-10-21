import axios from "axios"
import {
  ElMessage
} from 'element-plus'
// axios.defaults.withCredentials = true;
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'https://localhost:3007'
  // axios.defaults.baseURL = 'https://119.91.65.198'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://wangjingqi.top:3007'
}
const request = axios.create({
  // baseURL: "http://localhost:3007",
  // baseURL: "http://119.91.65.198:3000",
  timeout: 5000,
  withCredentials: true,
})

// response interceptor响应拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    // console.log(response.headers)
    return res;
  },
  (error) => {
    ElMessage({
      showClose: true,
      message: '网络错误,请刷新重试 ' + error.message,
      type: 'error',
    })
    return Promise.reject(error);
  }
);

// http request 拦截器
request.interceptors.request.use(
  (config: any) => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export { request };