import type { AxiosError } from 'axios'
import { api } from 'src/boot/axios'
import type { CreateAccessPayload } from '../types/access'

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

export const createAccess = async (accessData: CreateAccessPayload) => {
  try {
    const response = await api.post('/accesses', accessData)
    return response.data
  } catch (error) {
    const err = error as AxiosError<{ message: string }>
    const message = err.response?.data?.message || 'Erro ao criar acesso'
    throw new Error(message)
  }
}
