<script setup>
import { ref } from 'vue';

const props = defineProps({
    totalElements: Number,
    totalPages: Number,
})

const page = ref(0)

const emit = defineEmits(['page']);

const handlePage = (n) => {
    page.value = n - 1;
    emit('page', page.value)
}

const handlePrevious = () => {
    if (!page.value <= 0) {
        page.value -= 1
    }
    emit('page', page.value)
}

const handleNext = ()=>{
    if(page.value+1 < props.totalPages){
        page.value+=1;
    }
    emit('page' , page.value)
}

</script>

<template>
    <div class="d-flex justify-content-end">
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" @click="handlePrevious">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li v-for="n in props.totalPages" @click="handlePage(n)" class="page-item"
                    :class="page === n - 1 ? 'active' : ''">
                    <a class="page-link" href="#">{{ n }}</a>
                </li>
                <li class="page-item" @click="handleNext">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>