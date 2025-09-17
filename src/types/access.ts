import type { User } from './user'
import type { Resource } from './resource'

export interface Access {
  id: number
  user: User
  resource: Resource
  grantedByUser: User
  grantedAt: string
  expiresAt: string
  revokedAt: string | null
}

export interface CreateAccessPayload {
  userId: number | null
  resourceId: number | null
  expiresAt: string | null
}
