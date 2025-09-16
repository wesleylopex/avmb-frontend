import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<{ id: number; email: string } | null>(null)

  function setToken (newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)
    // se quiser, decodifique o JWT para extrair infos do usuário
  }

  function clearAuth () {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  return { token, user, setToken, clearAuth }
})
