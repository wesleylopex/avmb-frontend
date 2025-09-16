<template>
  <q-dialog v-model="internalOpen" persistent>
    <q-card class="q-pa-md" style="min-width: 400px; max-width: 600px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Novo recurso</div>
        <q-space />
        <q-btn dense flat round icon="close" @click="emit('close')" />
      </q-card-section>

      <q-card-section>
        <q-form>
          <!-- Nome -->
          <q-input
            v-model="form.name"
            label="Nome do recurso"
            dense
            outlined
            :rules="[val => !!val || 'O nome do recurso é obrigatório']"
          />
        </q-form>
      </q-card-section>

      <!-- Actions -->
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" @click="emit('close')" />
        <q-btn unelevated label="Pronto" color="primary" />
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

const form = ref({
  name: ''
})
</script>

