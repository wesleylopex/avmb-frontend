<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Recursos</div>
        <div class="text-subtitle2">Gerencie os recursos do sistema</div>
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
          @click="isCreateResourceOpen = true"
          @close="isCreateResourceOpen = false"
        />
      </q-card-section>
      <div class="q-pa-md w-full">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Nome</th>
              <th class="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-left">Usuários</td>
              <td class="text-left">
                <div>
                  <q-btn outline size="sm" color="primary" label="Editar" icon="edit" class="q-mr-sm" />
                  <q-btn outline size="sm" color="red" label="Excluir" icon="close" />
                </div>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </q-card>
  </q-page>

  <CreateResource :isOpen="isCreateResourceOpen" @close="isCreateResourceOpen = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import CreateResource from './CreateResource.vue'

const search = ref('')

const isCreateResourceOpen = ref(false)
</script>
