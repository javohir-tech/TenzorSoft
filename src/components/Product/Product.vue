<script setup>
//Props
const props = defineProps({
    id: Number,
    name: String,
    price: Number,
    stock: Number
})
</script>

<template>
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 gx-2 gy-3 rounded">
        <div class="product position-relative">
            <RouterLink :to="`/productDetail/${props.id}`" class="position-absolute top-0 start-0 bg-primary w-100 h-100 rounded z-2"></RouterLink>
            <div class="product-img d-flex justify-content-center align-items-center bg-secondary rounded-top">
                <i class="bi bi-card-image text-light"></i>
            </div>
            <div class="product-info px-3 py-2 rounded-bottom">
                <div class="d-flex justify-content-between">
                    <p>{{ props.name }}</p>
                    <p>{{ props.price }} $</p>
                </div>
                <p>{{ props.stock }} ta qolgan </p>
                <div class="text-end">
                    <button @click="()=>console.log('tahrirlash')" class="btn btn-warning me-2 position-relative z-3"><i class="bi bi-pencil-square"></i></button>
                    <button @click="()=>console.log('ochirish')" class="btn btn-danger position-relative z-3"><i class="bi bi-trash"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.product{
    a{
        opacity: 0;
    }
    a:hover{
        cursor: pointer;
    }
}
.product-img {
    height: 100px;

    i {
        font-size: 32px;
        transition: all 0.8ms  ease-in;
    }
}

.product-info {
    background-color: #F2F2F2;
    transition: all 0.3s ease-in;
    p{
        font-size: 15px;
        font-weight: 500;
        color: #234C6A;
    }
}

.product:hover {
    .product-info {
        background-color: #DCDCDC;
    }
    .product-img{
        i{
            font-size: 34px;
        }
    }
}
</style>