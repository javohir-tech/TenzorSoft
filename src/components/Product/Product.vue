<script setup>
//VUE
import { nextTick, onMounted, ref } from 'vue';
//HOOKS
import useApiActionsProducts from '../../Hooks/useApiActionsProducts';
//Componenets
import { FormControl } from '..';
//Bootstrap
import Modal from 'bootstrap/js/dist/modal';
//Store
import { productsStore } from '../../Stores/ProductStore';

const addProductStore = productsStore()

const { deleteProduct, putProduct, loading } = useApiActionsProducts()
//Props
const props = defineProps({
    id: Number,
    name: String,
    price: Number,
    stock: Number,
    category: String,
    isActive: Boolean
})

//DOM
let modalinstance = null;

const emit = defineEmits(['delete', 'edit', 'addStore',])
//PUT actions
const productName = ref(props.name)
const productPrice = ref(props.price);
const productStock = ref(props.stock);
const productCategory = ref(props.category);
const productActive = ref(props.isActive);
//Store
const added = ref(false);


const deleteProducts = async (id) => {
    try {
        await deleteProduct(id)
        emit('delete')
    } catch (error) {
        console.log(error)
    }
}

const editProduct = async (id) => {
    try {
        await putProduct(id, {
            name: productName.value,
            price: productPrice.value,
            stock: productStock.value,
            category: productCategory.value,
            isActive: productActive.value,
        })
        modalClose()
        emit('edit')
    } catch (error) {
        console.log(error)
    }
}

const handleAdd = () => {
    // console.log(added.value)
    if (added.value) {
        emit('addStore', false)
    } else {
        emit('addStore', true)
    }
    added.value = addProductStore.orderProducts.some(order => order.id === props.id)
}

onMounted(async () => {
    await nextTick();

    const modalEl = document.getElementById(`putAction-${props.id}`);

    if (modalEl) {
        modalinstance = new Modal(modalEl);

        modalEl.addEventListener('hide.bs.modal', () => {
            document.activeElement?.blur();
        })
        modalEl.addEventListener('hidden.bs.modal', () => {
            const backdrop = document.querySelector('.modal-backdrop')
            if (backdrop) backdrop.remove()
            document.body.style.removeProperty('overflow')
        })
    }
})

function modalClose() {
    modalinstance.hide()
}

function modalOpen() {
    modalinstance.show()
}

</script>


<template>
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 gx-2 gy-3 rounded">
        <div class="product position-relative">
            <RouterLink :to="`/productDetail/${props.id}`"
                class="position-absolute top-0 start-0 bg-primary w-100 h-100 rounded z-2"></RouterLink>
            <div class="product-image" aria-hidden="true">
                <h5 class="card-title placeholder-glow">
                    <span class="placeholder col-6 rounded-top"></span>
                </h5>
            </div>
            <div class="product-info px-3 py-2 rounded-bottom">
                <div class="d-flex justify-content-between">
                    <p>{{ props.name }}</p>
                    <p>{{ props.price }} $</p>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <p class="mb-0">{{ props.stock }} ta qolgan </p>
                    <span @click="handleAdd" class="position-relative z-3" :class="added ? 'text-danger' : ''"><i
                            class="bi bi-heart"></i></span>
                </div>
                <div class="text-end">
                    <button @click="modalOpen" class="btn btn-warning me-2 position-relative z-3"><i
                            class="bi bi-pencil-square"></i></button>
                    <button @click="deleteProducts(props.id)" class="btn btn-danger position-relative z-3"><i
                            class="bi bi-trash"></i></button>
                </div>
            </div>
        </div>
        <!--============MODAL=============-->
        <div class="modal fade" :id="`putAction-${props.id}`" tabindex="-1" aria-labelledby="putAction"
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
                        <button @click="modalClose" type="button" class="btn btn-secondary">
                            Close
                        </button>
                        <button type="button" class="btn btn-warning" @click="editProduct(props.id)"
                            :disabled="loading">
                            {{ loading ? 'loading...' : 'edit' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!--============/MODAL=============-->
    </div>
</template>

<style scoped>
.product {
    a {
        opacity: 0;
    }

    i:hover {
        cursor: pointer;
    }
}

.product-image {
    span{
        height: 120px;
        width: 100%;
    }
}

.product-info {
    background-color: #F2F2F2;
    transition: all 0.3s ease-in;

    p {
        font-size: 15px;
        font-weight: 500;
        color: #234C6A;
    }
}

.product:hover {
    .product-info {
        background-color: #DCDCDC;
    }

    .product-img {
        i {
            font-size: 34px;
        }
    }
}
</style>