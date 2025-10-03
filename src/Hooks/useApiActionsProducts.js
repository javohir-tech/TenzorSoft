//import axios
import axios from "axios";

export default function useApiActionsProducts() {

    const deleteProduct = async (id) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`)
            console.log(res)
            toast.success(res.data.message);
        } catch (error) {
            console.log(error)
        }
    }

    return {
        deleteProduct
    }
}