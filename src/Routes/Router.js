//Vue Router
import { createMemoryHistory, createRouter } from "vue-router";
//Main Layout
import MainLayout from "../Layout/MainLayout.vue";
//Views
import { Home, Products } from "../Views";

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
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export { router }