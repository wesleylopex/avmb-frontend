<template>
  <q-layout view="hHh lpR fFf">
    <q-page class="flex flex-center bg-grey-2">
      <q-card class="q-pa-lg shadow-2 rounded-borders" style="width: 350px">
        <q-card-section>
          <div class="text-h6 text-center">Criar conta</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="name"
            label="Nome"
            outlined
            dense
            type="text"
            class="q-mb-md"
          />
          <q-input
            v-model="email"
            label="E-mail"
            outlined
            dense
            type="email"
            class="q-mb-md"
          />
          <q-input
            v-model="password"
            label="Senha"
            outlined
            dense
            type="password"
            class="q-mb-md"
          />
          <q-btn
            label="Entrar"
            color="primary"
            class="full-width q-mt-md"
            @click="login"
            :to="{ name: 'home' }"
          />
        </q-card-section>

        <q-separator spaced />

        <q-card-section class="text-center">
          <q-btn :to="{ name: 'login' }" flat label="Já tenho conta" size="sm" color="primary" />
        </q-card-section>
      </q-card>
    </q-page>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const name = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')

const login = async (): Promise<void> => {
  // await router.push({ name: 'home' })
}
</script>
