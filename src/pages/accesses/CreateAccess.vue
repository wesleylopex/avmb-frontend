<template>
  <q-dialog v-model="internalOpen" persistent>
    <q-card class="q-pa-md" style="min-width: 400px; max-width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Novo Acesso</div>
        <q-space />
        <q-btn dense flat round icon="close" @click="emit('close')" />
      </q-card-section>

      <q-card-section>
        <q-form>
          <!-- Usuário -->
          <q-select
            v-model="form.userId"
            :options="users"
            option-label="name"
            option-value="id"
            label="Usuário"
            dense
            outlined
            clearable
            emit-value
            map-options
            :rules="[val => !!val || 'Selecione um usuário']"
          />

          <!-- Recurso -->
          <q-select
            v-model="form.resourceId"
            :options="resources"
            option-label="name"
            option-value="id"
            label="Recurso"
            dense
            outlined
            clearable
            emit-value
            map-options
            :rules="[val => !!val || 'Selecione um recurso']"
          />

          <!-- Expiração -->
          <q-input
            v-model="form.expiresAt"
            label="Expira em"
            type="datetime-local"
            dense
            outlined
            :rules="[val => !!val || 'Defina uma data de expiração']"
          />
        </q-form>
      </q-card-section>

      <!-- Actions -->
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" @click="emit('close')" />
        <q-btn unelevated label="Criar" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps<{
  isOpen: boolean,
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const internalOpen = ref(props.isOpen)

watch(() => props.isOpen, value => {
  internalOpen.value = value
})

const users = ref([
  { id: 1, name: 'Bianca Sabrina' },
  { id: 2, name: 'Wesley Lopes' },
  { id: 3, name: 'Ana Clara' },
])

const resources = ref([
  { id: 1, name: 'Recursos' },
  { id: 2, name: 'Configurações' },
  { id: 3, name: 'Relatórios' },
])

const form = ref({
  userId: null as number | null,
  resourceId: null as number | null,
  expiresAt: ''
})
</script>

