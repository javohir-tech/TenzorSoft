<script setup>
//Axios
import axios from 'axios';
//Components
import { Product } from '../../components';
//VUE
import { onMounted, ref, watch } from 'vue';

const content = ref([]);
const loading = ref(false);
const deleteAction = ref(false)

const getProducts = async () => {
    loading.value = true
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        // console.log(res)
        content.value = res.data.data.content
    } catch (error) {
        console.log(error.message)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    getProducts()
})

// watch(deleteAction, () => {
//     getProducts();
//     deleteAction.value= false
// })


</script>

<template>
    <div class="container h-100">
        <!-- LOADING -->
        <div class="loading d-flex justify-content-center align-items-center" v-if="loading && content.length === 0">
            <div class="spinner-grow text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow text-secondary mx-2" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow text-secondary me-2" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-grow text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <!-- ERROR -->
        <div class="error d-flex justify-content-center align-items-center alert alert-danger"
            v-else-if="!loading && content.length === 0">
            Malumotlarni olishni iloji bo'lmadi !!!
        </div>
        <!-- CONTENT -->
        <div class="row my-3" v-else>
            <Product v-for="product in content" :key="product.id" :id="product.id" :name="product.name"
                :price="product.price" :stock="product.stock" @delete="(val) => deleteAction = val" />
        </div>

    </div>
</template>

<style scoped></style>