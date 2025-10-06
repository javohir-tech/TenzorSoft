<script setup>
//Store
import { productsStore } from '../../Stores/ProductStore';
//Components
import { orderProduct } from '../../components';

const orderProducts = productsStore()


</script>

<template>
    <div class="mt-3 container" style="height: 100vh;" v-if="orderProducts.orders.length > 0">
        <div class="row g-2">
            <orderProduct v-for="order in orderProducts.orders" :name="order.name" :id="order.id" :key="order.id"
                :stock="order.stock" :price="order.stock" />
        </div>
    </div>
    <div style="height: 100vh;" class="d-flex justify-content-center align-items-center flex-column" v-else>
       <h3>Storega hech narsa qo'shilmagan </h3>
       <RouterLink to="/products" class="btn btn-primary">Products</RouterLink>
    </div>
</template>