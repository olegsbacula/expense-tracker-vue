<template>
<div class="main">
<v-card
    class="mx-auto text-center"
    color="rgb(235, 235, 235)"
    max-width="1000"
    width="400"
    variant="flat"
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .04)">
        <v-sparkline
          :auto-line-width="autoLineWidth"
          :fill="fill"
          :gradient="gradient"
          :gradient-direction="gradientDirection"
          :line-width="width"
          :model-value="props.arrayOfSums"
          :padding="padding"
          :smooth="radius || false"
          auto-draw
        >
         
          <template v-slot:label="item"> €{{ item.value }} </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="cardText">Balance Graph</div>
    </v-card-text>

    <v-divider />
  </v-card>
</div>


To DO a piechart 
</template>

<script setup>
import { ref, computed } from 'vue'
 import Chart from './chart.vue'
const props = defineProps({
  expenses: {
    type: Array,
    required: true, 
  },
  sum:{
    type: Number,
    required:true,
  },
  arrayOfSums:{
    type: Array,
    required:true,
  },
})
const gradients = ref([
  ['#0ea5e9', '#06b6d4', '#10b981'],
])

const width = ref(2)
const radius = ref(10)
const padding = ref(8)
const gradientDirection = ref('right') 
const fill = ref(false)
const autoLineWidth = ref(false)

const gradient = computed(() => gradients.value[0])

const series = computed(() => {
  let total = 0
  const out = []

  for (const item of props.expenses || []) {
    const nRaw = item?.expenses
    const n = Number(nRaw)
    if (Number.isFinite(n)) {
      const isIncome = String(item?.type || '').toLowerCase() === 'income'
      total += isIncome ? n : -n
      out.push(total)
    } else {
    }
  }

  if (out.length >= 2) return out
  if (out.length === 1) return [out[0], out[0]]  
  return [0, 0]                                   
})
</script>

<style scoped>
.main{
    background-color: rgb(235, 235, 235);
}
</style>