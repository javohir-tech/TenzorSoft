<script setup>
//Axios
import axios from 'axios';
//Components
import { Product } from '../../components';
//VUE
import { onMounted, ref } from 'vue';

const content = ref([])

const getProducts = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        console.log(res)
        content.value = res.data.data.content
    } catch (error) {
        console.log(error.message)
    }
}

onMounted(() => {
    getProducts()
})
</script>

<template>
    <div class="container h-100">
        <div class="loading d-flex justify-content-center align-items-center" v-if="content.length === 0">
            loading...
        </div>
        <div class="row my-3" v-else>
            <Product v-for="product in content" :key="product.id" :name="product.name" :price="product.price"
                :stock="product.stock" />
        </div>
    </div>
</template>

<style scoped>
.loading {
    height: 100vh;
}
</style>