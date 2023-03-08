import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import notifySuccess from '../../helpers/toastSuccess.js'
import axios from 'axios'
import notifyError from '../../helpers/toastError.js'

export const useGameStore = defineStore('game', {
  state: () => ({
    baseUrl: 'http://localhost:3000',
    games: [],
    loading: false
  }),
  getters: {
    getImage(state) {
      return state.games.cover.id
    }
  },
  actions: {
    async fetchGames() {
      try {
        this.loading = true
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/games'
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
