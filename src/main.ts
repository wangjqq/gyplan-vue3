import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import Element from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from 'pinia'  //导入pinia
const pinia = createPinia();        //调用创建pinia
createApp(App).use(router).use(Element).use(pinia).mount('#app')
