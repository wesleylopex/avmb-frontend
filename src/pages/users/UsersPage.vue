<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Usuários</div>
        <div class="text-subtitle2">Gerencie os usuários do sistema</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="row q-col-gutter-md">
        <q-input
          outlined
          dense
          debounce="300"
          v-model="search"
          placeholder="Pesquisar usuário"
          class="w-full"
          clearable
          clear-icon="close"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>
      <div class="q-pa-md w-full">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Nome</th>
              <th class="text-left">E-mail</th>
              <th class="text-left">Status</th>
              <th class="text-left">Data de cadasto</th>
              <th v-if="loggedUser?.role === 'admin'" class="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.email">
              <td class="text-left">{{ user.name }}</td>
              <td class="text-left">{{ user.email }}</td>
              <td class="text-left">
                <q-badge :color="getStatusColor(user.status)" :label="getStatusLabel(user.status)" />
              </td>
              <td class="text-left">{{ new Date(user.createdAt).toLocaleString() }}</td>
              <td v-if="loggedUser?.role === 'admin'" class="text-left">
                <div v-show="user.status === 'pending'">
                  <q-btn @click="approve(user.id)" outline size="sm" color="green" label="Aprovar" icon="check" class="q-mr-sm" />
                  <q-btn @click="reject(user.id)" outline size="sm" color="red" label="Reprovar" icon="close" />
                </div>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </q-card>
  </q-page>

  <SetStatus
    v-if="loggedUser?.role === 'admin'"
    :is-open="setStatusIsOpen"
    :user-id="setStatusUserId"
    :status="setStatusStatus"
    @close="setStatusIsOpen = false"
    @confirm="setUserStatus"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import SetStatus from './SetStatus.vue'

import { useAuthStore } from '../../stores/auth'

const { user: loggedUser } = useAuthStore()

import { getUsers, setStatus } from '../../services/user-service'
import type { User } from 'src/types/user'

const users = ref<User[]>([])
const search = ref('')

const setStatusIsOpen = ref(false)
const setStatusUserId = ref<number | null>(null)
const setStatusStatus = ref<'approved' | 'rejected' | null>(null)

onMounted(async () => {
  try {
    users.value = await getUsers()
  } catch (error) {
    console.log(error)
  }
})

const filteredUsers = computed(() => {
  if (!search.value) {
    return users.value
  }
  const searchLower = search.value.toLowerCase()
  return users.value.filter(user =>
    user.name.toLowerCase().includes(searchLower) ||
    user.email.toLowerCase().includes(searchLower) ||
    user.status.toLowerCase().includes(searchLower)
  )
})

function approve (userId: number): void {
  setStatusUserId.value = userId
  setStatusStatus.value = 'approved'
  setStatusIsOpen.value = true
}

function reject (userId: number): void {
  setStatusUserId.value = userId
  setStatusStatus.value = 'rejected'
  setStatusIsOpen.value = true
}

async function setUserStatus (userId: number | null, status: 'approved' | 'rejected' | null): Promise<void> {
  try {
    const updated = await setStatus(userId, status)

    console.log(updated)

    users.value = users.value.map(user => user.id === updated.id ? updated : user)
  } catch (error) {
    console.log(error)
  } finally {
    setStatusIsOpen.value = false
    setStatusUserId.value = null
    setStatusStatus.value = null
  }
}

function getStatusColor (status: string): string {
  const options: Record<string, string> = {
    pending: 'orange',
    approved: 'green',
    rejected: 'red'
  }
  return options[status] || 'orange'
}

function getStatusLabel (status: string): string {
  const options: Record<string, string> = {
    pending: 'Pendente',
    approved: 'Aprovado',
    rejected: 'Rejeitado'
  }
  return options[status] || 'Pendente'
}
</script>
