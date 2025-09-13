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
            <tr>
              <td class="text-left">Bianca Sabrina</td>
              <td class="text-left">Recursos</td>
              <td class="text-left">Wesley Lopes</td>
              <td class="text-left">13/09/2025 13:56</td>
              <td class="text-left">20/09/2025 13:56</td>
              <td class="text-left">16/09/2025 17:30</td>
              <td class="text-left">
                <q-btn outline size="sm" color="red" label="Revogar" icon="close" />
              </td>
            </tr>
            <tr>
              <td class="text-left">Carlos</td>
              <td class="text-left">Usuários</td>
              <td class="text-left">Wesley Lopes</td>
              <td class="text-left">13/09/2025 13:58</td>
              <td class="text-left">20/09/2025 13:58</td>
              <td class="text-left"></td>
              <td class="text-left">
                <q-btn outline size="sm" color="red" label="Revogar" icon="close" />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const search = ref('')
</script>
