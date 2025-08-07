<script setup>
import {onMounted, ref} from 'vue';
import { postANewExpense } from './composables/SendInsret.js';
import { getAllValues } from './composables/getAll.js';
import Table from './components/table.vue'
const formValues = ref({
  expenses: '',
  description: '',
  type: '',
})
const expenses=ref([])

function validateExpenses(formValues){
  if (parseInt(formValues.expenses) < 0){
    alert("Expenses cannot be lower than 0")
    return false
  }
  return true
}

const gray = {
  backgroundColor: 'rgb(224, 224, 224)',
  color: 'black',
  border: 'none',
  padding: '0.6em 1.2em',
  cursor: 'pointer',
  fontWeight:'thin'
}
const thin = {
fontWeight:''
}

async function OnSubmit(formValues){
   try{
      if (!validateExpenses(formValues)){
        return 
      }
      const newRecord = await postANewExpense(formValues)
      window.location.reload()
   }
   catch(err){
    console.error("Failed to post: ", err)
   }
 }

</script>
<template>
  <h1> 💰 Expense Tracker</h1>
  <div class="main">
    <div class="input">
      <FormKit
        type="form"
        v-model="formValues"
       :actions="false"
      >
        <FormKit
          type="number"
          name="expenses"
          label="Expenses"
          label-class="label-thin"
          :classes="{ label: 'font-thin' }"
          placeholder="Enter your expenses"
          validation="required"
        />

        <FormKit
          type="text"
          name="description"
          label="Description"
          label-class="text-red-300"
          :style="thin"
          placeholder="Enter a description"
          validation="required"
        />

        <FormKit
          type="select"          
          name="type"
          label="Type"
          label-class="font-thin"
          placeholder="Select type"
          :options="[
            { value: 'income', label: 'Income 💲' },
            { value: 'expense', label: 'Expense 📉' }
          ]"
          validation="required"
        />
        <FormKit type="button" @click="OnSubmit(formValues)" :style="gray">Submit expense</FormKit>
      </FormKit>
    </div>

    <div class="table">
      <Table />
    </div>
  </div>
</template>

<style scoped>
.main{
  height:100vh;
  width: 100vw;
  display: flex;           
  flex-direction: row;
}

h1{
  position:relative;
  margin-top:1%;
  margin-left:2%;
}

.input{
  margin:2% 2%;
  background-color: white;
   width: 400px;
   padding:10px;
   height:fit-content;
   border:1px solid rgb(200, 200, 200);
   border-radius: 2%;
}
.table{
  position: relative;
  width:800px;
  height:fit-content;
  border:1px solid rgb(200, 200, 200);
  border-radius: 0%;
  margin: 2% 2%;
}
</style>
