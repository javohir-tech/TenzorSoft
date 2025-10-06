<script setup>
//Store
import { productsStore } from '../../Stores/ProductStore';
//Toast
import { toast } from 'vue3-toastify';

const orderProducts = productsStore()

const props = defineProps({
    id: Number,
    name: String,
    price: Number,
    stock: Number
})

const handleDelete = () => {
    orderProducts.deleteProduct(props.id)
    toast.warning('Olindi')
}


</script>

<template>
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 gx-2 gy-3 rounded order-product">
        <div class="position-relative">
            <RouterLink :to="`/productDetail/${props.id}`"
                class="position-absolute top-0 start-0 bg-primary w-100 h-100 rounded z-2">
            </RouterLink>
            <div class="order-image" aria-hidden="true">
                <h5 class="card-title placeholder-glow">
                    <span class="placeholder col-6 rounded-top"></span>
                </h5>
            </div>
            <div class="order-info px-2 py-3 rounded-bottom">
                <div class="d-flex justify-content-between">
                    <p>{{ props.name }}</p>
                    <p>{{ props.price }} $</p>
                </div>
                <div class="d-flex justify-content-between">
                    <p>{{ props.stock }}</p>
                    <span @click="handleDelete" class="position-relative z-3">
                        <i class="bi bi-heart"
                            :class="orderProducts.orders.some(order => order.id === props.id) ? 'text-danger' : ''"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.order-image {
    span {
        height: 120px;
        width: 100%;
    }
}

.order-product {
    a {
        opacity: 0;
    }

    i:hover {
        cursor: pointer;
    }
}

.order-info {
    background-color: #F2F2F2;
    transition: all 0.3s ease-in;

    p {
        font-size: 15px;
        font-weight: 500;
        color: #234C6A;
    }
}

.order-info:hover {
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