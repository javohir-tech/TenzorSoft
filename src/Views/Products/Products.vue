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
    <div class="container">
        <div class="row mt-3">
            <Product v-for="product in content" :name="product.name" :price="product.price" :stock="product.stock" />
        </div>
    </div>
</template>