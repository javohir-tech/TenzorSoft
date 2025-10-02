<script setup>
//AXIOS
import axios from 'axios';
//VUE
import { onMounted, ref } from 'vue';
//VUE Router
import { useRoute } from 'vue-router';

const route = useRoute();

const data = ref(null);
const loading = ref(false)

const getProductDetails = async () => {
    loading.value = true
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/${route.params.id}`)
        // console.log(res);
        data.value = res.data.data
        console.log(data.value)
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    getProductDetails();
})
</script>

<template>
    <div class="container h-100">
        <!-- LOADING -->
        <div class="loading d-flex justify-content-center align-items-center" v-if="loading && data === null">
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
            v-else-if="!loading && data === null">
            Malumotlarni olishni iloji bo'lmadi !!!
        </div>
        <div v-else>
            {{ data.price }}
        </div>
    </div>
</template>

<style scoped></style>