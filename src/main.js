import { createApp } from 'vue';
import './style.css'
import App from './App.vue';
//Router
import { router } from './Routes/Router';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//Toastfy
import Vue3Toastify, {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App)

app.use(Vue3Toastify, {
    position: 'top-right',
    autoClose : 3000
})
app.use(router)
app.mount('#app')
