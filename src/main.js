import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//Router
import { router } from './Routes/Router'

const app =createApp(App)

app.use(router)
app.mount('#app')
