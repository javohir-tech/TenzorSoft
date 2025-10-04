<script setup>
//AXIOS
import axios from 'axios';
//VUE
import { nextTick, onMounted, ref } from 'vue';
//VUE Router
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
//DAYJS
import dayjs from 'dayjs';
//HOOKS
import useApiActionsProducts from '../../Hooks/useApiActionsProducts';
//Components
import FormControl from '../../components/Inputs/FormControl.vue'
//Bootstrap
import Modal from 'bootstrap/js/dist/modal';

const route = useRoute();
const router = useRouter();

const data = ref(null);
const loading = ref(false);
const date = ref(null);
let modalinstance =null;

//PUT actions
const productName = ref('');
const productPrice = ref(0);
const productStock = ref(0);
const productCategory = ref('');
const productActive = ref(false)

const { deleteProduct, putProduct, loading: loadingActions } = useApiActionsProducts()

const getProductDetails = async () => {
    loading.value = true
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/${route.params.id}`)
        // console.log(res);
        data.value = res.data.data;
        date.value = dayjs(res.data.createdAt).format('DD.MM.YYYY');
        productName.value = data.value.name;
        productPrice.value = data.value.price;
        productStock.value = data.value.stock;
        productCategory.value = data.value.category
        productActive.value = data.value.isActive
        console.log(data.value);
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const deleteProducts = async () => {
    try {
        await deleteProduct(route.params.id)
        setTimeout(() => router.push('/products'), 2000)
    } catch (error) {
        console.log(error)
    }
}

const editProduct = async () => {
    try {
        await putProduct(route.params.id, {
            name: productName.value,
            price: productPrice.value,
            stock: productStock.value,
            category: productCategory.value,
            isActive: productActive.value,
        })
        modalClose()
        await getProductDetails()
    } catch (error) {
        console.log(error)
    }
}

onMounted(async () => {
    await getProductDetails();
    await nextTick();

    const modalEl = document.getElementById('putAction');

    if (modalEl) {
        modalinstance = new Modal(modalEl);

        modalEl.addEventListener('hide.bs.modal', () => {
            document.activeElement?.blur();
        });
    } else {
        console.warn("Modal element topilmadi!");
    }
})

function modalOpen() {
    modalinstance.show()
}

function modalClose() {
    modalinstance.hide()
}

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
                        <button @click="modalOpen" class="btn btn-warning flex-fill">Put</button>
                        <button class="btn btn-danger flex-fill">Delete</button>
                        <!--============MODAL=============-->
                        <div class="modal fade" id="putAction" tabindex="-1" aria-labelledby="putAction"
                            aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Tahrirlash</h1>
                                        <button type="button" class="btn-close" @click="modalClose"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form @submit.prevent="editProduct">
                                            <div class="mb-3">
                                                <label for="name" class="form-label">Nomi</label>
                                                <FormControl v-model="productName" :placeholder="'name'" :type="'text'"
                                                    :id="'name'" :model-value="productName"
                                                    :validator="(val) => val.length >= 3" />
                                            </div>
                                            <div class="mb-3">
                                                <label for="price" class="form-label">Narxi</label>
                                                <FormControl v-model="productPrice" :placeholder="'price'"
                                                    :type="'number'" :id="'price'" :model-value="productPrice"
                                                    :validator="(val) => val >= 0" :invalid="'Eng kami 0 '" />
                                            </div>
                                            <div class="mb-3">
                                                <label for="stock" class="form-label">Soni</label>
                                                <FormControl v-model="productStock" :placeholder="'stock'"
                                                    :type="'number'" :id="'stock'" :model-value="productStock"
                                                    :validator="(val) => val >= 0" :invalid="'enng  kami  0'" />
                                            </div>
                                            <div class="mb-3">
                                                <label for="category" class="form-label">Kategorysi</label>
                                                <FormControl v-model="productCategory" :placeholder="'kategoty'"
                                                    :id="'category'" :model-value="productCategory"
                                                    :validator="(val) => val.length >= 3" />
                                            </div>
                                            <div class="mb-3">
                                                <div class="form-check form-switch">
                                                    <input v-model="productActive" class="form-check-input"
                                                        type="checkbox" role="switch" id="switchCheckDefault">
                                                    <label class="form-check-label"
                                                        for="switchCheckDefault">Active</label>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button @click="modalClose" type="button" class="btn btn-secondary">
                                            Close
                                        </button>
                                        <button type="button" class="btn btn-warning" @click="editProduct"
                                            :disabled="loadingActions">
                                            {{ loadingActions ? 'loading...' : 'edit' }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--============/MODAL=============-->
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