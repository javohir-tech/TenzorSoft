<script setup>
//vue
import { ref } from 'vue';


const username = ref('');
const password = ref('')

const handleLogin = async () => {
    try {
        
    } catch (error) {
        
    }
}
</script>

<template>
    <div>
        <form @submit.prevent="handleLogin">
            <input type="text" placeholder="username">
            <input type="password" placeholder="password">
        </form>
    </div>
</template>
