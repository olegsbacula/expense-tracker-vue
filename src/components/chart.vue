<template>
<div class="main">
<v-card
    class="mx-auto text-center"
    color="rgb(235, 235, 235)"
    width="400"
    variant="flat"
    border=""
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
    :smooth="false"
    :stroke-linecap="lineCap"
    :type="type"
    auto-draw
        >
         
          <template v-slot:label="item"> €{{ item.value }} </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="cardText"><i>Balance Graph</i></div>
    </v-card-text>

    <v-divider />
  </v-card>
</div>


To DO a piechart 
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
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

</script>

<style scoped>
.main{
    background-color: rgb(235, 235, 235);
}
.cardText{
  font-weight: 30;
  font-size:15px;
}
</style>