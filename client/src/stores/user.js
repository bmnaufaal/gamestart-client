import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import notifySuccess from '../../helpers/toastSuccess.js'
import axios from 'axios'
import notifyError from '../../helpers/toastError.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    baseUrl: 'http://localhost:3000',
    userData: {
      id: 0,
      name: '',
      profilePicture: '',
      UserId: 0,
      role: ''
    }
  }),
  actions: {
    async fetchUserData() {
      try {
        console.log('fetch user data')
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/profile',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.userData.id = data.id
        this.userData.name = data.name
        this.userData.profilePicture = data.profilePicture
        this.userData.UserId = data.UserId
        this.userData.role = data.User.role
      } catch (error) {
        console.log(error)
        notifyError(error.response.data.message)
      }
    }
  }
})
