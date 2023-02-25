import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import { Cell, CellGroup, Search, Loading } from 'vant';
import 'normalize.css'
import 'element-plus/dist/index.css'
import '@/assets/main.css'
import './permission'
const app = createApp(App)
const pinia = createPinia()
app.use(Cell);
app.use(CellGroup);
app.use(Search);
app.use(Loading);
app.use(pinia);
app.use(router);
app.use(ElementPlus);
app.mount('#app')
