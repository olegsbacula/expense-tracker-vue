<template>
    <v-data-table
      hide-default-footer
      :items="expenses"
      :headers="headers"
      :style="{ border: '1px solid rgb(200, 200, 200)' }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-icon
              color="medium-emphasis"
              icon="mdi-cash-multiple"
              size="x-small"
              start
            ></v-icon>

            Expenses
          </v-toolbar-title>

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
            @click="remove(item.id)"
          ></v-icon>
        </div>
      </template>

      <template v-slot:no-data>
        <v-btn
          prepend-icon="mdi-backup-restore"
          rounded="lg"
          text="Reset data"
          variant="text"
          border
          @click="reset"
        ></v-btn>
      </template>
    </v-data-table>

  <v-dialog v-model="dialog" max-width="500">
    <v-card
      :subtitle="`${isEditing ? 'Update' : 'Create'} your favorite book`"
      :title="`${isEditing ? 'Edit' : 'Add'} a Book`"
    >
      <template v-slot:text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="formModel.title"
              label="Title"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="formModel.author"
              label="Author"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="formModel.genre"
              :items="['Fiction', 'Dystopian', 'Non-Fiction', 'Sci-Fi']"
              label="Genre"
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-number-input
              v-model="formModel.year"
              :max="currentYear"
              :min="1"
              label="Year"
            ></v-number-input>
          </v-col>

          <v-col cols="12" md="6">
            <v-number-input
              v-model="formModel.pages"
              :min="1"
              label="Pages"
            ></v-number-input>
          </v-col>
        </v-row>
      </template>

      <v-divider></v-divider>

      <v-card-actions class="bg-surface-light">
        <v-btn text="Cancel" variant="plain" @click="dialog = false"></v-btn>

        <v-spacer></v-spacer>

        <v-btn text="Save" @click="save"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { getAllValues } from '../composables/getAll.js';
  import { onMounted, ref, shallowRef, toRef } from 'vue';
    import { mdiBookMultiple } from '@mdi/js';
    import { mdiAccount,mdiDomain } from '@mdi/js';
import { genOverlays } from 'vuetify/lib/composables/variant.mjs';
  const currentYear = new Date().getFullYear()
  function createNewRecord () {
    return {
      title: '',
      author: '',
      genre: '',
      year: currentYear,
      pages: 1,
    }
  }

  const books = ref([])
  const formModel = ref(createNewRecord())
  const dialog = shallowRef(false)
  const isEditing = toRef(() => !!formModel.value.id)

  const expenses=ref([])

    const headers = [
    { title: 'ID', key: 'id', align: 'start' },
    { title: 'Expense', key: 'expenses', align: 'start' },
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


</script>
