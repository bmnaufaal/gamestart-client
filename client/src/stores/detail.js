import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import notifySuccess from '../../helpers/toastSuccess.js'
import axios from 'axios'
import notifyError from '../../helpers/toastError.js'
import { useRoute } from 'vue-router'
import notifyInfo from '../../helpers/toastInfo.js'

export const useDetailStore = defineStore('detail', {
  state: () => ({
    baseUrl: 'https://gamestart-production.up.railway.app',
    game: [
      {
        name: '',
        videos: [
          {
            video_id: ''
          }
        ]
      }
    ],
    route: useRoute()
  }),
  actions: {
    async handleAddToWishlist(id) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: this.baseUrl + '/wishlists/add',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            gameId: id
          }
        })
        notifySuccess(data.message)
        this.router.push('/wishlists')
      } catch (error) {
        console.log(error)
        notifyError(error.response.data.message)
      }
    },
    async fetchDetailData(id) {
      try {
        console.log('fetch user data')
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/games/' + id
        })
        this.game = data
      } catch (error) {
        console.log(error)
        notifyError(error.response.data.message)
      }
    },
    async createMyGame(id) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: this.baseUrl + '/mygames/add',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            gameId: id
          }
        })
        notifySuccess(data.message)
      } catch (error) {
        console.log(error)
        notifyError(error.response.data.message)
      }
    },
    async buyGame(id) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: this.baseUrl + '/generate-midtrans-token',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        const cb = this.createMyGame
        window.snap.pay(data.token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            notifySuccess('Payment success!')
            cb(id)
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            notifyInfo('Wating your payment!')
            console.log(result)
          },
          onError: function (result) {
            /* You may add your own implementation here */
            notifyError('Payment failed!')
            console.log(result)
          },
          onClose: function () {
            /* You may add your own implementation here */
            notifyInfo('You closed the popup without finishing the payment')
          }
        })

        await axios({
          method: 'POST',
          url: this.baseUrl + '/generate-midtrans-token',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
      } catch (error) {
        console.log(error)
        notifyError(error.response.data.message)
      }
    }
  }
})
