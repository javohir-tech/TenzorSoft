<script setup>
//VUe
import { ref } from 'vue';
//Hooks
import { useAuth } from '../Hooks/useAuth';

//useAuth
const { loading, register } = useAuth();

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
    <div class="row auth">
        <div class="col-5 d-flex h-100 flex-column align-items-center justify-content-center">
            <div class="w-75">
                <h3 class="mb-3">Sign Up</h3>
                <!-- Form Section -->
                <form @submit.prevent="handleRegister" class="d-flex flex-column w-100 gap-3">
                    <input v-model="username" id="username" class="form-control" type="text" placeholder="Your Name">
                    <input v-model="password" class="form-control" type="password" placeholder="Password">
                    <input v-model="email" class="form-control" type="email" placeholder="Email">
                    <button class="btn btn-primary" type="submit">Sign Up</button>
                </form>
                <!-- Forget Password -->
                <div class="text-end mt-3">
                    <a href="">Forgot password ?</a>
                </div>

                <div class="d-flex justify-content-center gap-3 mt-3 align-items-center">
                    <span class="line"></span>
                    <p class="mb-0">or</p>
                    <span class="line"></span>
                </div>

                <!-- Google and Facebook-->
                <div class="d-flex justify-content-between gap-2 mt-3">
                    <button class="btn btn-outline-primary flex-fill"><i class="bi bi-google"></i> Google</button>
                    <button class="btn btn-outline-primary flex-fill"><i class="bi bi-facebook"></i> Facebook</button>
                </div>

                <!-- Sign In -->
                <div class="mt-3">
                    <p class="d-inline text-secondary">Don't have an account ?</p> <router-link to="/login" style="font-weight: 600; text-decoration: none;">Sign In</router-link>
                </div>
            </div>
        </div>
        <div class="auth-banner col-7">
            <img src="https://picsum.photos/seed/picsum/800/600" alt="">
        </div>
    </div>
</template>

<style scoped>
/* @import url(); */
.auth {
    height: 100%;
}

.auth-banner {
    img {
        border-top-left-radius: 40px;
        border-bottom-left-radius: 40px;
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}

.line {
    display: inline;
    width: 200px;
    border: 1px solid #E4E6EC;
}
</style>