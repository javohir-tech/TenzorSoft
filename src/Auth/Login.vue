<script setup>
//vue
import { ref } from 'vue';
// Hooks
import { useAuth } from '../Hooks/useAuth';
//useAuth
const { loading, login } = useAuth();


const username = ref('');
const password = ref('');

const handleLogin = async () => {
    try {
        await login({
            username: username.value,
            password: password.value
        })
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <div>
        <form @submit.prevent="handleLogin">
            <input v-model="username" type="text" placeholder="username">
            <input v-model="password" type="password" placeholder="password">
            <button type="submit">{{ loading ? 'loading....' : 'jo\'natish' }}</button>
        </form>
    </div>
</template>
