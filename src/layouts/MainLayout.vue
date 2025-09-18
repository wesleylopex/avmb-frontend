<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>
          <q-toggle
            v-model="themeIsDark"
            :true-value="true"
            :false-value="false"
            label="Dark Mode"
            @update:model-value="toggleTheme"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
        <q-item clickable @click="logout" exact>
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Sair</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'

import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue'

const allLinksList: EssentialLinkProps[] = [
  {
    title: 'Home',
    caption: '',
    icon: 'home',
    route: { name: 'home' },
  },
  {
    title: 'Usuários',
    caption: '',
    icon: 'group',
    route: { name: 'users' },
  },
  {
    title: 'Gerenciar acessos',
    caption: '',
    icon: 'lock_open',
    route: { name: 'accesses' }
  }
]

const authStore = useAuthStore()

const linksList = allLinksList.filter(link => {
  if (link.route?.name === 'home') return true

  return authStore.hasResource(link.route.name)
})

const router = useRouter()

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const $q = useQuasar()
const themeIsDark = ref($q.dark.isActive)

const savedTheme = localStorage.getItem('themeIsDark')

if (savedTheme !== null) {
  themeIsDark.value = savedTheme === 'true'
  $q.dark.set(themeIsDark.value)
}

function toggleTheme () {
  $q.dark.toggle()
  localStorage.setItem('themeIsDark', String(themeIsDark.value))
}

async function logout () {
  authStore.clearAuth()
  await router.push({ name: 'login' })
}
</script>
