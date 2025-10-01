import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//Router
import { router } from './Routes/Router'
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app =createApp(App)

app.use(router)
app.mount('#app')
