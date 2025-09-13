<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Gerenciar acesos</div>
        <div class="text-subtitle2">Gerencie os permissões dos usuários no sistema</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="flex justify-between items-center">
        <q-input
          outlined
          dense
          debounce="300"
          v-model="search"
          placeholder="Digite para pesquisar"
          class="w-full"
          clearable
          clear-icon="close"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn color="primary" label="Adicionar acesso" icon="add" />
      </q-card-section>
      <div class="q-pa-md w-full">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Usuário</th>
              <th class="text-left">Recurso</th>
              <th class="text-left">Admin responsável</th>
              <th class="text-left">Data</th>
              <th class="text-left">Expiração</th>
              <th class="text-left">Revogado em</th>
              <th class="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="access in filteredAccesses"
              :key="access.id"
              :class="{ 'bg-yellow-2': isExpiringSoon(access) }"
            >
              <td class="text-left">Bianca Sabrina</td>
              <td class="text-left">Recursos</td>
              <td class="text-left">Wesley Lopes</td>
              <td class="text-left">{{ new Date(access.grantedAt).toLocaleString() }}</td>
              <td class="text-left">{{ new Date(access.expiresAt).toLocaleString() }}</td>
              <td class="text-left">{{ access.revokedAt && new Date(access.revokedAt).toLocaleString() }}</td>
              <td class="text-left">
                <q-btn @click="openRevokeConfirmation(access.id)" outline size="sm" color="red" label="Revogar" icon="close" />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </q-card>
  </q-page>

  <RevokeConfirmation
    :is-open="isDialogOpen"
    :access-id="selectedAccessId"
    @close="isDialogOpen = false"
    @confirm="revoke"
  />
</template>

<script lang="ts" setup>
import RevokeConfirmation from './RevokeConfirmation.vue'

import { ref, computed } from 'vue'

interface Access {
  id: number
  userId: number
  resourceId: number
  grantedBy: number
  grantedAt: string
  expiresAt: string
  revokedAt?: string | null
}

const isDialogOpen = ref<boolean>(false)
const selectedAccessId = ref<number | null>(null)

const search = ref('')

const accesses = ref<Access[]>([
  { id: 1, userId: 1, resourceId: 1, grantedBy: 2, grantedAt: '2025-09-13 13:56', expiresAt: '2025-09-20 13:56', revokedAt: '2025-09-16 17:30' },
  { id: 2, userId: 3, resourceId: 1, grantedBy: 2, grantedAt: '2025-09-13 13:58', expiresAt: '2025-09-13 21:00', revokedAt: null },
  { id: 3, userId: 3, resourceId: 1, grantedBy: 2, grantedAt: '2025-09-13 13:58', expiresAt: '2025-09-13 21:00', revokedAt: null },
])

const filteredAccesses = computed(() => {
  if (!search.value) {
    return accesses.value
  }
  const searchLower = search.value.toLowerCase()
  return accesses.value.filter(access =>
    access.userId.toString().toLowerCase().includes(searchLower) ||
    access.resourceId.toString().includes(searchLower) ||
    access.grantedBy.toString().toLowerCase().includes(searchLower)
  )
})

function openRevokeConfirmation (accessId: number): void {
  isDialogOpen.value = true
  selectedAccessId.value = accessId
}

function revoke (accessId: number | null): void {
  console.log('Revogar acesso com ID:', accessId)
}

function isExpiringSoon (access: Access): boolean {
  if (access.revokedAt) return false

  const expiresAt = new Date(access.expiresAt)

  console.log('expiresAt', expiresAt)

  const now = new Date()
  const diffInMs = expiresAt.getTime() - now.getTime()
  const diffInHours = diffInMs / (1000 * 60 * 60)

  return diffInHours > 0 && diffInHours <= 1
}
</script>
