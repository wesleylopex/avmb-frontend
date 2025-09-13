<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Usuários</div>
        <div class="text-subtitle2">Gerencie os usuários do sistema</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="row q-col-gutter-md">
        <q-input
          outlined
          dense
          debounce="300"
          v-model="search"
          placeholder="Pesquisar usuário"
          class="w-full"
          clearable
          clear-icon="close"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>
      <div class="q-pa-md w-full">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Nome</th>
              <th class="text-left">E-mail</th>
              <th class="text-left">Status</th>
              <th class="text-left">Data de cadasto</th>
              <th class="text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.email">
              <td class="text-left">{{ user.name }}</td>
              <td class="text-left">{{ user.email }}</td>
              <td class="text-left">
                <q-badge :color="colorByStatus(user.status)" :label="user.status" />
              </td>
              <td class="text-left">13/09/2025 00:12</td>
              <td class="text-left">
                <div v-show="user.status === 'Pendente'">
                  <q-btn @click="approve(user.email)" outline size="sm" color="green" label="Aprovar" icon="check" class="q-mr-sm" />
                  <q-btn outline size="sm" color="red" label="Reprovar" icon="close" />
                </div>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </q-card>
  </q-page>
</template>

<script lang="ts">
  import { ref } from 'vue'

  interface User {
    name: string
    email: string
    status: string
    date: string
  }

  export default {
    name: 'UsersPage',
    setup () {
      return {
        colorByStatus (status: string): string {
          const options: Record<string, string> = {
            'Pendente': 'orange',
            'Aprovado': 'green',
            'Reprovado': 'red'
          }
          return options[status] || 'orange'
        },
        search: ref(''),
        users: ref<User[]>([
          { name: 'Wesley Lopes', email: 'wesleylopes@gmail.com', status: 'Pendente', date: '13/09/2025 00:12' },
          { name: 'Bianca Sabrina', email: 'biancasabrina@gmail.com', status: 'Aprovado', date: '13/09/2025 00:10' },
          { name: 'Carlos Medim', email: 'carlosmedim@gmail.com', status: 'Reprovado', date: '12/09/2025 13:22' }
        ])
      }
    },
    methods: {
      approve (userEmail: string) {
        console.log(`Aprovando usuário com email: ${userEmail}`)
      }
    },
    computed: {
      filteredUsers (): User[] {
        if (!this.search) {
          return this.users
        }
        const searchLower = this.search.toLowerCase()
        return this.users.filter(user =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.status.toLowerCase().includes(searchLower)
        )
      }
    }
  }
</script>
