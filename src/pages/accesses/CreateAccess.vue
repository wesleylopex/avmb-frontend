<template>
  <q-dialog v-model="internalOpen" persistent>
    <q-card class="q-pa-md" style="min-width: 400px; max-width: 600px">

      <q-form ref="formRef" @submit.prevent="onFormSubmit">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Novo Acesso</div>
          <q-space />
          <q-btn dense flat round icon="close" @click="emit('close')" />
        </q-card-section>

        <q-card-section>
            <q-select
              v-model="userId"
              :options="users"
              option-label="name"
              option-value="id"
              label="Usuário"
              dense
              outlined
              clearable
              emit-value
              map-options
              :rules="[required]"
            />
            <q-select
              v-model="resourceId"
              :options="resources"
              option-label="name"
              option-value="id"
              label="Recurso"
              dense
              outlined
              clearable
              emit-value
              map-options
              :rules="[required]"
            />
            <q-input
              v-model="expiresAt"
              label="Expira em"
              type="datetime-local"
              dense
              outlined
              :rules="[required]"
            />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn type="button" flat label="Cancelar" color="primary" @click="emit('close')" />
          <q-btn type="submit" unelevated label="Criar" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'

import type { User } from 'src/types/user'
import type { Resource } from 'src/types/resource'

import { getUsers } from '../../services/user-service'
import { getResources } from '../../services/resource-service'

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const internalOpen = ref(props.isOpen)

watch(() => props.isOpen, value => {
  internalOpen.value = value
})

const users = ref<User[]>([])
const resources = ref<Resource[]>([])

onMounted(async () => {
  try {
    users.value = await getUsers()
    resources.value = await getResources()
  } catch (error) {
    console.log(error)
  }
})

const formRef = ref()

const userId = ref<number | null>(null)
const resourceId = ref<number | null>(null)
const expiresAt = ref<string>('')

const required = (val: string) => !!val || 'Campo obrigatório.'

function onFormSubmit () {
  const isValid = formRef.value.validate()

  if (!isValid) {
    return
  }

  emit('close')
}
</script>

