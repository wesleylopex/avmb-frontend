<template>
  <q-dialog v-model="internalOpen" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Tem certeza que deseja {{ statusAction }} este usuário?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" @click="emit('close')" />
        <q-btn :label="`Sim, ${statusAction}`" color="primary" @click="emit('confirm', userId, status)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'

const props = defineProps<{
  isOpen: boolean,
  userId: number | null,
  status: 'approved' | 'rejected' | null,
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm', userId: number | null, status: 'approved' | 'rejected' | null): void
}>()

const internalOpen = ref(props.isOpen)

watch(() => props.isOpen, value => {
  internalOpen.value = value
})

const statusAction = computed(() => {
  return props.status === 'approved' ? 'aprovar' : 'reprovar'
})
</script>
