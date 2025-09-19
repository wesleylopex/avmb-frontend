<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Bem-vindo(a) {{ authStore.user?.name }}</div>
        <div class="text-subtitle2">Use o menu para navegar entre as seções</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="flex q-gutter-md items-center">
        <q-btn
          v-if="authStore.hasResource('accesses')"
          color="primary"
          label="Gerenciar Acessos"
          icon="manage_accounts"
          to="/accesses"
        />
        <q-btn
          v-if="authStore.hasResource('users')"
          color="primary"
          label="Gerenciar Usuários"
          icon="people"
          to="/users"
        />
      </q-card-section>
    </q-card>
    <q-card class="q-mt-md">
      <q-card-section>
        <div class="text-h6">Seus recursos</div>
        <div class="text-subtitle2">Recursos que você tem acesso</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Recurso</th>
              <th class="text-left">Data de concessão</th>
              <th class="text-left">Data de expiração</th>
              <th class="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="access in accesses" :key="access.id">
              <td class="text-left">{{ access.resource.name }}</td>
              <td class="text-left">{{ new Date(access.grantedAt).toLocaleString() }}</td>
              <td class="text-left">{{ new Date(access.expiresAt).toLocaleString() }}</td>
              <td class="text-left">
                <q-badge :color="getAccessStatusColor(access)" :label="getAccessStatus(access)" />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth'

import type { Access } from 'src/types/access'
import { getUserAccesses } from '../services/access-service'

const authStore = useAuthStore()

const accesses = ref<Access[]>([])

onMounted(async () => {
  try {
    if (!authStore.user?.id) return

    const userId = Number(authStore.user.id)
    const data = await getUserAccesses(userId)

    accesses.value = data
  } catch (error) {
    console.log(error)
  }
})

function getAccessStatus (access: Access): string {
  if (access.revokedAt) return 'Revogado'

  const expiresAt = new Date(access.expiresAt)
  const now = new Date()

  if (expiresAt < now) return 'Expirado'

  return 'Ativo'
}

function getAccessStatusColor (access: Access): string {
  if (access.revokedAt) return 'red'

  const expiresAt = new Date(access.expiresAt)
  const now = new Date()

  if (expiresAt < now) return 'orange'

  return 'green'
}
</script>
