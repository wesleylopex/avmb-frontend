import type { AxiosError } from 'axios'
import { api } from 'src/boot/axios'

export const getResources = async () => {
  try {
    const response = await api.get('/resources')
    return response.data
  } catch (error) {
    const err = error as AxiosError<{ message: string }>
    const message = err.response?.data?.message || 'Erro no ao buscar recursos'
    throw new Error(message)
  }
}
