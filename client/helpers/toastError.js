import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const notifyError = (message) => {
  toast.error(message, {
    autoClose: 1000,
    position: 'top-center',
    theme: 'dark'
  }) // ToastOptions
}

export default notifyError
