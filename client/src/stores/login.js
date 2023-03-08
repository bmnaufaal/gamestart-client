import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import notifySuccess from '../../helpers/toastSuccess.js'
import axios from 'axios'
import notifyError from '../../helpers/toastError.js'

export const useLoginStore = defineStore('login', {
  state: () => ({
    baseUrl: 'http://localhost:3000',
    inputLogin: {
      email: '',
      password: ''
    },
    isLoggedIn: false
  }),
  actions: {
    async handleLogin() {
      try {
        const { data } = await axios({
          method: 'POST',
          url: this.baseUrl + '/login',
          data: this.inputLogin
        })
        notifySuccess(data.message)
        localStorage.setItem('access_token', data.access_token)
        this.isLoggedIn = true
        this.router.push('/home')
      } catch (error) {
        console.log(error)
        notifyError(error.response.data.message)
      }
    },

    async handleLogout() {
      console.log('logout')
      localStorage.clear()
      this.isLoggedIn = false
      this.router.push('/login')
      notifySuccess('Success logout')
    },

    async callback(response) {
      // This callback will be triggered when the user selects or login to
      // his Google account from the popup
      try {
        const google = await axios({
          method: 'POST',
          url: this.baseUrl + '/customers/google-sign-in',
          headers: {
            token_google: response.credential
          }
        })
        notifySuccess('Success Google Sign In')
        localStorage.setItem('access_token', google.data.access_token)
        this.isLoggedIn = true
        this.router.push('/home')
      } catch (error) {
        console.log(error)
        notifyError('Failed Google Sign In')
      }
    }
  }
})
