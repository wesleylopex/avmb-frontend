<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Gerenciar acessos</div>
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
        <q-btn
          color="primary"
          label="Adicionar acesso"
          icon="add"
          @click="isCreateAccessOpen = true"
          @close="isCreateAccessOpen = false"
        />
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
              <td class="text-left">{{ access.user.name }}</td>
              <td class="text-left">{{ access.resource.name }}</td>
              <td class="text-left">{{ access.grantedByUser.name }}</td>
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

  <CreateAccess
    :is-open="isCreateAccessOpen"
    :success="creationSuccess"
    @submit="handleCreateAccess"
    @close="isCreateAccessOpen = false"
  />

  <RevokeConfirmation
    :is-open="isRevokeConfirmationOpen"
    :access-id="selectedAccessId"
    @close="isRevokeConfirmationOpen = false"
    @confirm="revoke"
  />
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'

import { getAccesses, createAccess, revokeAccess } from '../../services/access-service'

import CreateAccess from './CreateAccess.vue'
import RevokeConfirmation from './RevokeConfirmation.vue'

import type { Access, CreateAccessPayload } from '../../types/access'

const isCreateAccessOpen = ref<boolean>(false)
const creationSuccess = ref<boolean>(false)

const isRevokeConfirmationOpen = ref<boolean>(false)
const selectedAccessId = ref<number | null>(null)

const search = ref('')

const accesses = ref<Access[]>([])

onMounted(async () => {
  try {
    accesses.value = await getAccesses()
  } catch (error) {
    console.log(error)
  }
})

const filteredAccesses = computed(() => {
  if (!search.value) {
    return accesses.value
  }
  const searchLower = search.value.toLowerCase()
  return accesses.value.filter(access =>
    access.user.name.toString().toLowerCase().includes(searchLower) ||
    access.resource.name.toString().toLowerCase().includes(searchLower) ||
    access.grantedByUser.name.toString().toLowerCase().includes(searchLower)
  )
})

async function handleCreateAccess (accessData: CreateAccessPayload): Promise<void> {
  try {
    const created = await createAccess(accessData)

    if (created) {
      accesses.value.push(created)

      creationSuccess.value = true
    }
  } catch (error) {
    console.log(error)
    creationSuccess.value = false
  }
}

function openRevokeConfirmation (accessId: number): void {
  isRevokeConfirmationOpen.value = true
  selectedAccessId.value = accessId
}

async function revoke (accessId: number | null): Promise<void> {
  if (!accessId) return

  try {
    const revoked = await revokeAccess(accessId)

    if (revoked) {
      accesses.value = accesses.value.map(access => {
        if (access.id === accessId) return revoked
        return access
      })

      isRevokeConfirmationOpen.value = false
    }
  } catch (error) {
    console.log(error)
  }
}

function isExpiringSoon (access: Access): boolean {
  if (access.revokedAt) return false

  const expiresAt = new Date(access.expiresAt)

  const now = new Date()
  const diffInMs = expiresAt.getTime() - now.getTime()
  const diffInHours = diffInMs / (1000 * 60 * 60)

  return diffInHours > 0 && diffInHours <= 1
}
</script>
