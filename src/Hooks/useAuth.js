//Axios
import axios from 'axios';

//Vue
import { ref } from 'vue';

//Vue Roueter
import { useRouter } from 'vue-router';

//Toastfy
import { toast } from 'vue3-toastify';

const userName = ref(null);
const token = ref(null);
const loading = ref(false);

export function useAuth() {

    const router = useRouter();

    const register = async (data) => {
        loading.value = true
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, data);
            userName.value = res.data.data.username;
            token.value = res.data.data.token;
            // console.log(res.data.message);
            toast.success(res.data.message)
            localStorage.setItem('token', token.value)
            router.push('/')
        } catch (error) {
            console.log(error.message)
        }
        finally {
            loading.value = false
        }
    }

    const login = async (credentials) => {
        loading.value = true;
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, credentials);
            // console.log(res);
            userName.value = res.data.data.userName;
            token.value = res.data.data.token;
            localStorage.setItem('token', token.value);
            toast.success(res.data.message, {autoClose: 4000})
            router.push('/');
        } catch (error) {
            toast.error(error.message)
            // console.log(error.message)
        } finally {
            loading.value = false
        }
    }

    return {
        login,
        register,
        token,
        loading,
    }
}

