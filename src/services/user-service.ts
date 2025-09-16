import type { AxiosError } from 'axios'
import { api } from 'src/boot/axios'

export const getUsers = async () => {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (error) {
    const err = error as AxiosError<{ message: string }>
    const message = err.response?.data?.message || 'Erro no ao buscar usuários'
    throw new Error(message)
  }
}
