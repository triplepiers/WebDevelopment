import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// element-ui 全部引入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 中文支持
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus, {locale, size: 'small'})
// app.use(ElementPlus, {size: 'small'})

app.mount('#app')
