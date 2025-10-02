<script setup>
const props = defineProps({
    name: String,
    price :Number,
    stock : Number
})
</script>

<template>
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div>
            <div class="product-img">
                <img src="" alt="">
            </div>
            <div class="product-info">
                <div>
                    <p>{{ props.name }}</p>
                    <p>{{ props.price }}</p>
                </div>
                <p>{{ props.stock }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>