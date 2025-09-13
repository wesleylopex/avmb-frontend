<template>
  <q-dialog v-model="internalOpen" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">Tem certeza que deseja revogar este acesso?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" @click="emit('close')" />
        <q-btn label="Sim, revogar" color="primary" @click="emit('confirm', accessId)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps<{
  isOpen: boolean,
  accessId: number | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm', accessId: number | null): void
}>()

const internalOpen = ref(props.isOpen)

watch(() => props.isOpen, value => {
  internalOpen.value = value
})
</script>
