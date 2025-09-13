export interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  updatedAt?: string | null
}
