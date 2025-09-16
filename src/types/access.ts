import type { User } from './user'

interface Resource {
  id: number
  name: string
  slug: string
}

export interface Access {
  id: number
  user: User
  resource: Resource
  grantedByUser: User
  grantedAt: string
  expiresAt: string
  revokedAt: string | null
}
