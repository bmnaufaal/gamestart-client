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
    }
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
    }
  }
})
