
<script setup>
  import { getAllValues } from '../composables/getAll.js';
  import { onMounted, ref, shallowRef, computed } from 'vue';
  import { patchAnExpense } from '../composables/postForTable.js';
  import { DeleteExpense } from '../composables/delete.js'
  import { DeleteAllExpense } from '../composables/deleteAll.js'
const formTableValues = ref({
  id:'',
  expenses: '',
  description: '',
  type: '',
})

  const dialog = shallowRef(false)
  const isEditing = computed(() => !!formTableValues.value.id)

  const expenses=ref([])

    const headers = [
    { title: 'ID', key: 'id', align: 'start' },
    { title: 'Amount', key: 'expenses', align: 'start' },
    { title: 'Description', key: 'description' },
    { title: 'Type', key: 'type' },
    { title: 'Actions', key: 'actions', align: 'end', sortable: false },
  ]

  onMounted(async () => {
        try{
    const response  = await getAllValues()
    expenses.value = response
    }
    catch (err){
        console.error(err)
  }
  })

  function edit(id){
    const item = expenses.value.find(e => e.id ===id )
    if (item){
            formTableValues.value = {... item,
            expenses: Number(item.expenses)
        }
        dialog.value=true
    }
  }
</script>

<template>
    <div class="table">
    <v-data-table
      hide-default-footer
      :items="expenses"
      color="black"
      :headers="headers"
    >
      <template v-slot:top>
        <v-toolbar border="false" flat>
          <v-toolbar-title>
            <v-icon
              color="medium-emphasis"
              icon="mdi-cash-multiple"
              size="x-small"
              start
            ></v-icon>

            Expenses
          </v-toolbar-title>
          <v-btn
            class="me-2"
            prepend-icon="mdi-minus-box"
            rounded="lg"
            text="Delete all expenses"
            border
            @click="DeleteAllExpense()"
          ></v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.expenses="{ value }">
        <v-chip
          :text="value"
          border="thin opacity-25"
          label
        >
          <template v-slot:prepend>
            <v-icon color="medium-emphasis" icon="mdi-cash" ></v-icon>
          </template>
        </v-chip>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon
            color="medium-emphasis"
            icon="mdi-pencil"
            size="small"
            @click="edit(item.id)"
          ></v-icon>

          <v-icon
            color="medium-emphasis"
            icon="mdi-delete"
            size="small"
            @click="DeleteExpense(item.id)"
          ></v-icon>
        </div>
      </template>
    </v-data-table>
</div>
  <v-dialog v-model="dialog" max-width="500">
    <v-card
      :subtitle="`${isEditing ? 'Update' : 'Update'} your expense.`"
      :title="`${isEditing ? 'Edit' : 'Edit'} the expense`"
    >
      <template v-slot:text>
        <v-row>
          <v-col cols="12">
            <v-number-input
              v-model="formTableValues.expenses"
              :min="0"
              label="Expenses"
            ></v-number-input>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="formTableValues.description"
              label="Description"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="formTableValues.type"
              :items="['Income', 'Expense']"
              label="Type"
            ></v-select>
          </v-col>
        </v-row>
      </template>

      <v-divider></v-divider>

      <v-card-actions class="bg-surface-light">
        <v-btn text="Cancel" variant="plain" @click="dialog = false"></v-btn>

        <v-spacer></v-spacer>

        <v-btn text="Save" @click="patchAnExpense(formTableValues)"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>