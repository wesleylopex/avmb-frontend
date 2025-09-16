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
              <th class="text-left">Ações</th>
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
              <td class="text-left">
                <div v-show="user.status === 'pending'">
                  <q-btn @click="approve(user.email)" outline size="sm" color="green" label="Aprovar" icon="check" class="q-mr-sm" />
                  <q-btn outline size="sm" color="red" label="Reprovar" icon="close" />
                </div>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { User } from 'src/types/user'

import { getUsers } from '../services/user-service'

const users = ref<User[]>([])
const search = ref('')

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

function approve (userEmail: string): void {
  console.log(`Aprovando usuário com email: ${userEmail}`)
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
