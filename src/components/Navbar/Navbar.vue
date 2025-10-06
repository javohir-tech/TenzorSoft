<script setup>
//VUE
import { onMounted, ref } from 'vue';
//HOOKS
import { useAuth } from '../../Hooks/useAuth';
//DICEBEAR
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
//Store
import { productsStore } from '../../Stores/ProductStore';

const orderProducts = productsStore()

const profilAvatar = ref(null);

const getAvatar = () => {
    const userName = localStorage.getItem('username');
    if (userName) {
        const avatar = createAvatar(initials, {
            "seed": userName
        });

        profilAvatar.value = avatar.toDataUri();
    }
}

onMounted(() => {
    getAvatar()
});

const { logOut } = useAuth()

</script>

<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container">
                <RouterLink class="navbar-brand" to="/">Tenzor Soft</RouterLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/">Home</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink class="nav-link" to="/products">Products</RouterLink>
                        </li>
                    </ul>
                    <div class="dropdown">
                        <img v-if="profilAvatar" :src="profilAvatar" alt="profilImage" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li class="position-relative">
                                <RouterLink class="dropdown-item" to="/orders">Orders</RouterLink>
                                <span v-if="orderProducts.orders.length > 0"
                                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {{ orderProducts.orders.length }}
                                    <span class="visually-hidden">unread messages</span>
                                </span>
                            </li>
                            <li><span class="dropdown-item" @click="logOut">logOut</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<style scoped>
.navbar-nav {
    a {
        font-weight: 500;
        font-size: 16px;
    }
}

.dropdown {
    width: 100px;

    img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }
}
</style>