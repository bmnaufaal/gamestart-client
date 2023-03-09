import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import notifySuccess from '../../helpers/toastSuccess.js'
import axios from 'axios'
import notifyError from '../../helpers/toastError.js'

export const useGameStore = defineStore('game', {
  state: () => ({
    baseUrl: 'https://gamestart-production.up.railway.app',
    games: [
      {
        cover: {
          image_id: ''
        }
      }
    ],
    loading: false,
    maxPages: 0
  }),
  actions: {
    async fetchGames(page, size, search) {
      try {
        this.loading = true
        let queryParams = {
          page: page,
          size: size
        }
        if (search) {
          queryParams.search = search
        }
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/games',
          params: queryParams
        })
        this.loading = false
        this.games = data
      } catch (error) {
        console.log(error)
        this.loading = false
        notifyError(error.response.data.message)
      }
    },
    async handleAddToWishlist(gameId) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: this.baseUrl + '/wishlists/add',
          headers: {
            access_token: localStorage.getItem('access_token s')
          },
          data: {
            gameId: gameId
          }
        })
        notifySuccess(data.message)
      } catch (error) {
        console.log(error)
        this.loading = false
        notifyError(error.response.data.message)
      }
    }
  }
})
