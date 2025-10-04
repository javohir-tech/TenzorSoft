//import axios
import axios from "axios";
import { ref } from "vue";
//Toast
import { toast } from "vue3-toastify";

const loading = ref(false)

export default function useApiActionsProducts() {

    const deleteProduct = async (id) => {
        loading.value = true
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`)
            console.log(res)
            toast.success(res.data.message);
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    }

    const putProduct = async (id, data) => {
        loading.value = true
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/products/${id}`, data)
            console.log(res)
            toast.success(res.data.message)
        } catch (error) {
            console.log(error)
        }finally{
            loading.value = false
        }
    }

    return {
        deleteProduct,
        putProduct,
        loading
    }
}