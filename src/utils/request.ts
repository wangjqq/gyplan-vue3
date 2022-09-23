import axios from "axios"
import {
  ElMessage
} from 'element-plus'
// axios.defaults.withCredentials = true;
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:3007'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://119.91.65.198:3000'
}
const request = axios.create({
  // baseURL: "http://localhost:3007",
  // baseURL: "http://119.91.65.198:3000",
  timeout: 10000,
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
      message: error.message,
      type: 'error',
    })
    return Promise.reject(error);
  }
);

// http request 拦截器
request.interceptors.request.use(
  (config: any) => {
    // if (localStorage.token) { //判断token是否存在
    // config.headers.session_key = '123';  //将token设置成请求头

    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export { request };