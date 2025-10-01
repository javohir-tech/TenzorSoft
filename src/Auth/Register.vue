<script setup>
//VUe
import { ref } from 'vue';
//Hooks
import { useAuth } from '../Hooks/useAuth';

//useAuth
const { loading , register } = useAuth();

const username = ref('');
const password = ref('');
const email = ref('');

const handleRegister = async () => {
    try {
        await register({
            username: username.value,
            password: password.value,
            email: email.value
        })
    } catch (err) {
        console.log("Xatolik :", err)
    }
}
</script>

<template>
    <div style="display: inline-block; width: 300px;">
        <form @submit.prevent="handleRegister" style="display: flex; flex-direction: column; gap: 10px;">
            <input v-model="username" type="text" placeholder="username">
            <input v-model="password" type="password" placeholder="password">
            <input v-model="email" type="email" placeholder="emial">
            <button type="submit">Jo'natish</button>
        </form>
    </div>
</template>

<style></style>