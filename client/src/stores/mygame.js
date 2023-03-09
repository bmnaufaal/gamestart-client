import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import notifySuccess from '../../helpers/toastSuccess.js'
import axios from 'axios'
import notifyError from '../../helpers/toastError.js'
import { useRoute } from 'vue-router'

export const useMyGameStore = defineStore('mygame', {
  state: () => ({
    baseUrl: 'https://gamestart-production.up.railway.app',
    mygames: [],
    loading: false
  }),
  actions: {
    async fetchMyGames() {
      try {
        this.loading = true
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/mygames',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.loading = false
        this.mygames = data
        console.log(data)
      } catch (error) {
        console.log(error)
        this.loading = false
        notifyError(error.response.data.message)
      }
    }
  }
})
