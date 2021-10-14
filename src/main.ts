import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import "./public.less"


createApp(App).use(router).mount('#app')
