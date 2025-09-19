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
              :rules="[required]"
            />
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
              :rules="[required]"
            />
            <q-input
              v-model="form.expiresAt"
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
import type { QForm } from 'quasar'

import { useAuthStore } from '../../stores/auth'

const { user: loggedUser } = useAuthStore()

import type { User } from 'src/types/user'
import type { CreateAccessPayload } from 'src/types/access'
import type { Resource } from 'src/types/resource'

import { getUsers } from '../../services/user-service'
import { getResources } from '../../services/resource-service'

const props = defineProps<{ isOpen: boolean, success: boolean }>()
const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'submit', payload: CreateAccessPayload): void
}>()

const internalOpen = ref(props.isOpen)

watch(() => props.isOpen, value => {
  internalOpen.value = value
})

const users = ref<User[]>([])
const resources = ref<Resource[]>([])

onMounted(async () => {
  try {
    if (!loggedUser) return

    const fetchedUsers: User[] = await getUsers()
    users.value = fetchedUsers.filter(user => user.role !== 'admin' && user.id !== loggedUser.id)

    resources.value = await getResources()
  } catch (error) {
    console.log(error)
  }
})

const formRef = ref<QForm | null>(null)

const form = ref({
  userId: null,
  resourceId: null,
  expiresAt: null
})

const required = (val: string) => !!val || 'Campo obrigatório.'

async function onFormSubmit () {
  const valid = await formRef.value?.validate()
  if (!valid) return

  emit('submit', form.value)
}

watch(() => props.success, (newVal) => {
  if (newVal) {
    formRef.value?.resetValidation()
    form.value = {
      userId: null,
      resourceId: null,
      expiresAt: null
    }
    emit('close')
  }
})
</script>

