import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import notifySuccess from '../../helpers/toastSuccess.js'
import axios from 'axios'
import notifyError from '../../helpers/toastError.js'

export const useRegisterStore = defineStore('register', {
  state: () => ({
    baseUrl: 'https://gamestart-production.up.railway.app',
    inputRegister: {
      email: '',
      password: ''
    }
  }),
  actions: {
    async handleRegister() {
      try {
        const { data } = await axios({
          method: 'POST',
          url: this.baseUrl + '/register',
          data: this.inputRegister
        })
        notifySuccess(data.message)
        this.router.push('/login')
      } catch (error) {
        console.log(error)
        notifyError(error.response.data.message)
      }
    }
  }
})
