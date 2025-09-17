import { ref } from 'vue'
import { defineStore } from 'pinia'

import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
  sub: number
  name: string
  email: string
  role: 'user' | 'admin'
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<JwtPayload | null>(null)

  function setToken (newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)

    if (newToken) {
      user.value = jwtDecode<JwtPayload>(newToken)
    }
  }

  function clearAuth () {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  return { token, user, setToken, clearAuth }
})
