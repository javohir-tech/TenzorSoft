<script setup>
//Axios
import axios from 'axios';
//Components
import { FormControl, Pagination, Product } from '../../components';
//VUE
import { nextTick, onMounted, ref, watch } from 'vue';
//HOOKS
import useApiActionsProducts from '../../Hooks/useApiActionsProducts'
//Bootstrap
import Modal from 'bootstrap/js/dist/modal';

const { addProduct, loading: loadingAdd } = useApiActionsProducts()

const content = ref([]);
const loading = ref(false);
//Product item 
const productName = ref('');
const productPrice = ref(0);
const productStock = ref(0);
const productCategory = ref('');
const productActive = ref(true);
//DOM
let modalInstance = null;
//Pagination
const totalElements = ref(0);
const totalPages = ref(0);
//Search
const search = ref('')

const page = 0;

const getProducts = async (page = 0) => {
    loading.value = true
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}`);
        // console.log(res)
        totalElements.value = res.data.data.totalElements
        totalPages.value = res.data.data.totalPages
        content.value = res.data.data.content
    } catch (error) {
        console.log(error.message)
    } finally {
        loading.value = false
    }
}

const getSearchProducts = async (searchItem) => {
    loading.value = true;
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/search?query=${searchItem}`)
        console.log(res);
    } catch (error) {
        console.log(error)
    }
}

const addProducts = async () => {
    try {
        await addProduct({
            name: productName.value,
            price: productPrice.value,
            stock: productStock.value,
            category: productCategory.value,
            isActive: productActive.value,
        })
        productName.value = "";
        productPrice.value = 0;
        productStock.value = 0;
        productCategory.value = '',
            modalClose()
        console.log("tayyor")
        getProducts()
    } catch (error) {
        console.log(error)
    }
}

onMounted(async () => {
    await getProducts()
    await nextTick();

    const modalEl = document.getElementById('addProduct');

    if (modalEl) {
        modalInstance = new Modal(modalEl);
        modalEl.addEventListener('hide.bs.modal', () => {
            document.activeElement?.blur()
        })
    } else {
        console.log(`Modal elemant topilmadi`)
    }
})

function modalOpen() {
    modalInstance.show()
}

function modalClose() {
    modalInstance.hide()
}

// watch(search, () => {
//     getSearchProducts(search)
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
        <div v-else>
            <div class="justify-content-end d-flex mt-3">
                <form class="d-flex" @submit.prevent="getSearchProducts(search)" role="search">
                    <input v-model="search" class="form-control me-2" type="search" placeholder="Search"
                        aria-label="Search" />
                </form>
                <button @click="modalOpen" class="btn btn-primary">Add Product</button>
            </div>
            <div class="row my-3">
                <Product v-for="product in content" :key="product.id" :is-active="product.isActive"
                    :category="product.category" :id="product.id" :name="product.name" :price="product.price"
                    :stock="product.stock" @delete="getProducts" @edit="getProducts" />
            </div>
            <!--===========Pagination============-->
            <Pagination :total-pages="totalPages" :total-elements="totalElements"
                @page="async (n) => await getProducts(n)" />
        </div>
        <!--=================MODAl===========================-->
        <div class="modal fade" id="addProduct" tabindex="-1" aria-labelledby="addProduct" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" @click="modalClose"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="addProducts">
                            <div class="mb-3">
                                <label for="name" class="form-label">Nomi</label>
                                <FormControl v-model="productName" :placeholder="'name'" :type="'text'" :id="'name'"
                                    :model-value="productName" :validator="(val) => val.length >= 3" />
                            </div>
                            <div class="mb-3">
                                <label for="price" class="form-label">Narxi</label>
                                <FormControl v-model="productPrice" :placeholder="'price'" :type="'number'"
                                    :id="'price'" :model-value="productPrice" :validator="(val) => val >= 0"
                                    :invalid="'Eng kami 0 '" />
                            </div>
                            <div class="mb-3">
                                <label for="stock" class="form-label">Soni</label>
                                <FormControl v-model="productStock" :placeholder="'stock'" :type="'number'"
                                    :id="'stock'" :model-value="productStock" :validator="(val) => val >= 0"
                                    :invalid="'enng  kami  0'" />
                            </div>
                            <div class="mb-3">
                                <label for="category" class="form-label">Kategorysi</label>
                                <FormControl v-model="productCategory" :placeholder="'kategoty'" :id="'category'"
                                    :model-value="productCategory" :validator="(val) => val.length >= 3" />
                            </div>
                            <div class="mb-3">
                                <div class="form-check form-switch">
                                    <input v-model="productActive" class="form-check-input" type="checkbox"
                                        role="switch" id="switchCheckDefault">
                                    <label class="form-check-label" for="switchCheckDefault">Active</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="modalClose">Close</button>
                        <button @click="addProducts" type="button" class="btn btn-primary" :disabled="loadingAdd">
                            {{ loadingAdd ? 'Loading...' : 'Add Product' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!--=================/MODAl===========================-->
    </div>
</template>

<style scoped></style>