//Vue Router
import { createWebHistory, createRouter } from "vue-router";
//Main Layout
import MainLayout from "../Layout/MainLayout.vue";
//Views
import { Home, Products } from "../Views";
//Auth
import { Login, Register } from "../Auth";

const routes = [
    {
        path: "/",
        component: MainLayout,
        children: [
            {
                path: '',
                component: Home
            },
            {
                path: 'products',
                component: Products
            }
        ]
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, form, next) => {

    const maqullangan = ['/login', '/register'];

    const token = localStorage.getItem('token');

    if (token && (to.path === '/login' || to.path === '/register')) {
        next("/")
    }

    if(!token  && !maqullangan.includes(to.path)){
        next('/login')
    }

    next()

})

export { router }