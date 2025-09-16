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
          color="primary"
          label="Gerenciar Acessos"
          icon="manage_accounts"
          to="/accesses"
        />
        <q-btn
          color="primary"
          label="Gerenciar Usuários"
          icon="people"
          to="/users"
        />
        <q-btn
          color="primary"
          label="Gerenciar Recursos"
          icon="folder"
          to="/resources"
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
            <tr>
              <td class="text-left">Recursos</td>
              <td class="text-left">01/01/2024 10:00</td>
              <td class="text-left">01/02/2024 10:00</td>
              <td class="text-left">
                <q-badge color="green" label="Ativo" />
              </td>
            </tr>
            <tr>
              <td class="text-left">Relatórios Financeiros</td>
              <td class="text-left">15/12/2023 14:30</td>
              <td class="text-left">15/01/2024 14:30</td>
              <td class="text-left">
                <q-badge color="red" label="Expirado" />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth'

const authStore = useAuthStore()
</script>
