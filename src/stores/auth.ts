import { ref } from 'vue'
import { defineStore } from 'pinia'

import { getMe } from '../services/auth-service'

export interface Resource {
  id: number
  name: string
  slug: string
  expiresAt: string
}

export interface User {
  id: number
  name: string
  email: string
  role: string
  resources: Resource[]
}


export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<User | null>(null)

  const fetchMe = async () => {
    try {
      const me = await getMe()
      user.value = me

      console.log(me)

      return me
    } catch (error) {
      console.log(error)
    }
  }

  function hasResource(slug: string) {
    return !!user.value?.resources.some(r => r.slug === slug)
  }


  function setToken (newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function clearAuth () {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  return { token, user, fetchMe, hasResource, setToken, clearAuth }
})
