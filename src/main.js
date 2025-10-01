import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//Router
import { router } from './Routes/Router'
//Antd
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)

app.use(router)
app.use(Antd)
app.mount('#app')
