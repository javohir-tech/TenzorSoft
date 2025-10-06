import { defineStore } from "pinia";

export const productsStore = defineStore('productsStore', {
    state: () => ({
        orderProducts: []
    }),

    getters: {
        orders : (state)=> state.orderProducts
    },

    actions: {
        addProduct(product) {
            this.orderProducts.push(product)
        }
    }


})