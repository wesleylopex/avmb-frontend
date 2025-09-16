<template>
  <q-layout view="hHh lpR fFf">
    <q-page class="flex flex-center bg-grey-2">
      <q-form ref="formRef" @submit.prevent="onFormSubmit">
        <q-card class="q-pa-lg shadow-2 rounded-borders" style="width: 350px">
          <q-card-section>
            <div class="text-h6 text-center">Login</div>
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="email"
              label="E-mail"
              outlined
              dense
              type="email"
              class="q-mb-md"
              :rules="[required, validEmail]"
            />
            <q-input
              v-model="password"
              label="Senha"
              outlined
              dense
              type="password"
              class="q-mb-md"
              :rules="[required]"
            />
            <q-btn
              type="submit"
              label="Entrar"
              color="primary"
              class="full-width q-mt-md"
            />
          </q-card-section>

          <q-separator spaced />

          <q-card-section class="text-center">
            <q-btn :to="{ name: 'signup' }" flat label="Criar conta" size="sm" color="primary" />
          </q-card-section>
        </q-card>
      </q-form>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Notify } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'

import { login } from '../../services/auth-service'

const authStore = useAuthStore()
const router = useRouter()

const formRef = ref()

const required = (val: string) => !!val || 'Campo obrigatório.'
const validEmail = (val: string) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
  return regex.test(val) || 'E-mail inválido.'
}

const email = ref<string>('')
const password = ref<string>('')

const onFormSubmit = async (): Promise<void> => {
  const isValid = formRef.value.validate()

  if (!isValid) {
    return
  }

  try {
    const data = await login(email.value, password.value)
    authStore.setToken(data.accessToken)

    await router.push({ name: 'home' })
  } catch (error: unknown) {
    let message = 'Erro ao criar conta'

    if (error instanceof Error) {
      message = error.message
    }

    Notify.create({
      message,
      color: 'negative',
      position: 'bottom-right',
      timeout: 3000
    })
  }
}
</script>
