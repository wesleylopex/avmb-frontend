import type { AxiosError } from 'axios'
import { api } from 'src/boot/axios'

export const getAccesses = async () => {
  try {
    const response = await api.get('/accesses')
    return response.data
  } catch (error) {
    const err = error as AxiosError<{ message: string }>
    const message = err.response?.data?.message || 'Erro no ao buscar acessos'
    throw new Error(message)
  }
}
