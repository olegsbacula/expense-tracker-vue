<template>
    <v-card
    class="mx-auto"
    prepend-icon="mdi-currency-usd"
    subtitle="This card counts money."
    width="400"
  >
    <template v-slot:title>
      <span class="font-weight-black">Your money situation</span>
    </template>

    <v-card-text class="bg-surface-light pt-4">
        Your balance: <b>{{ sum }} </b>.
    </v-card-text>
  </v-card>
  </template>

<script setup>
import { toRef, ref ,computed} from 'vue';
const props = defineProps({
    sum:{
        type:Number,
        required:true
    }
})

const sum = toRef(props, 'sum')
const text = computed(() => {
  return sum.value < 0
    ? 'broke'
    : 'rich'
})

</script>