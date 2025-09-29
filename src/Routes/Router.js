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

export { router }