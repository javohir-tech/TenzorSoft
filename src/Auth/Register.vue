<script setup>
//VUe
import { ref, Text } from 'vue';
//Hooks
import { useAuth } from '../Hooks/useAuth';
//Components
import FormControl from '../components/Inputs/FormControl.vue';

//useAuth
const { loading, register } = useAuth();

const username = ref('');
const password = ref('');
const confirmPassword = ref('')
const email = ref('');
//Validation

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

                    <!-- ============== USERNAME =============== -->
                    <FormControl placeholder="Your Name" type="text" id="username" v-model="username"
                        :-validator="(val) => val.length >= 3" invalid="Fill in the blank." />
                    <!-- ============= PASSWORD ================ -->
                    <FormControl placeholder="Password" type="password" id="password" v-model="password"
                        :-validator="(val) => val.length >= 6" invalid="password must be at least 6 characters long" />
                    <!-- ================ CONFIRM PASSWORD ==================== -->
                    <FormControl placeholder="Confirm Password" type="password" id="confirm-password"
                        v-model="confirmPassword" :-validator="(val) => val === password"
                        invalid="enter the password correctly" />
                    <!-- ================= EMAIL ADDRESS ======================= -->
                    <FormControl placeholder="Email Addres" type="email" id="emial" v-model="email"
                        :-validator="(val) => val.includes('@gmail.com')" invalid="enter the email correctly"/>

                    <button class="btn btn-primary" type="submit" :disabled="loading">{{ loading ? "Loading..." :
                        "SignUp" }}</button>
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
                    <p class="d-inline text-secondary">Don't have an account ?</p> <router-link to="/login"
                        style="font-weight: 600; text-decoration: none;">Sign In</router-link>
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