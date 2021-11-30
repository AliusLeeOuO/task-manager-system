import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import "./public.less"

console.log(`%c
　　　　　　　Ｍ　　　　　　　　　　　　　　　　　　　　　　　　ＭＭ　　　　Ｍ　　Ｍ　　
　ＭＭＭＭＭＭＭＭＭＭＭＭＭ　　ＭＭＭＭＭＭＭＭＭＭＭＭＭ　　　ＭＭ　　　　Ｍ　　Ｍ　　
　　　　　　ＭＭ　　　　　　　　　　　　　　ＭＭ　　　　　　　　ＭＭＭＭＭＭＭＭＭＭＭＭ
　　　ＭＭＭＭＭＭＭＭＭ　　　　　　　　　ＭＭＭ　　　　　　　ＭＭ　　　　　Ｍ　　Ｍ　　
　　　Ｍ　　　　　　　Ｍ　　　　　　　　　ＭＭＭＭ　　　　　　ＭＭＭＭＭ　　Ｍ　　Ｍ　　
　　　ＭＭＭＭＭＭＭＭＭ　　　　　　　　ＭＭＭＭＭＭ　　　　　　　Ｍ　　ＭＭＭＭＭＭＭＭ
　　　ＭＭＭＭＭＭＭＭＭ　　　　　　ＭＭＭ　Ｍ　ＭＭＭ　　　　　　Ｍ　　　ＭＭＭＭＭＭ　
　　　Ｍ　　　　　　　Ｍ　　　　　ＭＭＭ　　Ｍ　　　ＭＭ　　　ＭＭＭＭＭ　ＭＭＭＭＭＭ　
　　　ＭＭＭＭＭＭＭＭＭ　　　　ＭＭＭ　　　Ｍ　　　　ＭＭ　　　　Ｍ　　　Ｍ　　　　Ｍ　
　　　Ｍ　　　　　　　Ｍ　　　　　　　　　　Ｍ　　　　　　　　　　Ｍ　　　ＭＭＭＭＭＭ　
　ＭＭＭＭＭＭＭＭＭＭＭＭＭ　　　　　　　　Ｍ　　　　　　　　　　Ｍ　ＭＭＭ　　　　Ｍ　
　　　ＭＭＭＭ　ＭＭＭＭ　　　　　　　　　　Ｍ　　　　　　　　　　ＭＭＭＭＭＭ　　ＭＭ　
　ＭＭＭＭＭ　　　ＭＭＭＭＭ　　　　　　　　Ｍ　　　　　　　　　　ＭＭ　　ＭＭＭＭＭＭ　
`,`
color: #40a9ff;text-align:center;
`
)

console.log(`%c这就是四个靓仔的杰作 没想到吧！`,`font-size: 35px;font-family: san-serif;color: #40a9ff;`)

createApp(App).use(router).mount('#app')
