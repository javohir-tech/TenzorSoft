<script setup>
//AXIOS
import axios from 'axios';
//VUE
import { onMounted, ref } from 'vue';
//VUE Router
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
//DAYJS
import dayjs from 'dayjs';
//HOOKS
import useApiActionsProducts from '../../Hooks/useApiActionsProducts';

const route = useRoute();
const router = useRouter();

const data = ref(null);
const loading = ref(false);
const date = ref(null);

const { deleteProduct } = useApiActionsProducts()

const getProductDetails = async () => {
    loading.value = true
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/${route.params.id}`)
        // console.log(res);
        data.value = res.data.data;
        date.value = dayjs(res.data.createdAt).format('DD.MM.YYYY');
        console.log(data.value);
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const deleteProducts = async()=>{
    try {
       await deleteProduct(route.params.id)
    } catch (error) {
        console.log(error)
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
        <div class="row g-2 mt-3" v-else>
            <div class="col-12 col-md-6">
                <div class="product-image bg-secondary rounded d-flex justify-content-center align-items-center">
                    <i class="bi bi-card-image text-light"></i>
                </div>
            </div>
            <div class="col-12 col-md-5 product-info">
                <div class="">
                    <div class="d-flex justify-content-between">
                        <p>{{ data.name }}</p>
                        <p>{{ data.price }} $</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p>{{ data.stock }} ta qolgan </p>
                        <p>Category : {{ data.category }}</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="mb-0">{{ date === null ? '' : date }} da yartilgan</p>
                        <p class="mb-0"><i class="bi bi-heart"></i></p>
                    </div>
                    <div class="d-flex flex-column flex-md-row gap-2 mt-2">
                        <button class="btn btn-warning flex-fill">Put</button>
                        <button @click="deleteProducts" class="btn btn-danger flex-fill">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.product-image {
    height: 150px;
}
</style>