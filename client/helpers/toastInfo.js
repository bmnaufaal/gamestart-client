import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const notifyInfo = (message) => {
  toast.info(message, {
    autoClose: 1000,
    position: 'top-center',
    theme: 'dark'
  }) // ToastOptions
}

export default notifyInfo
