import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const notifySuccess = (message) => {
  toast.success(message, {
    autoClose: 1000,
    position: 'top-center',
    theme: 'dark'
  }) // ToastOptions
}

export default notifySuccess
