import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import notifySuccess from '../../helpers/toastSuccess.js'
import axios from 'axios'
import notifyError from '../../helpers/toastError.js'
import { useRoute } from 'vue-router'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    baseUrl: 'http://localhost:3000',
    wishlists: [],
    loading: false
  }),
  actions: {
    async fetchWishlists() {
      try {
        this.loading = true
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/wishlists',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.loading = false
        this.wishlists = data
        console.log(data)
      } catch (error) {
        console.log(error)
        this.loading = false
        notifyError(error.response.data.message)
      }
    }
  }
})
