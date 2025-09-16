import type { AxiosError } from 'axios'
import { api } from 'src/boot/axios'

interface SignupData {
  name: string
  email: string
  password: string
}

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  } catch (error) {
    const err = error as AxiosError<{ message: string }>
    const message = err.response?.data?.message || 'Erro no cadastro'
    throw new Error(message)
  }
}

export const signup = async (signupData: SignupData) => {
  try {
    const response = await api.post('/auth/signup', signupData)
    return response.data
  } catch (error) {
    const err = error as AxiosError<{ message: string }>
    const message = err.response?.data?.message || 'Erro no cadastro'
    throw new Error(message)
  }
}
