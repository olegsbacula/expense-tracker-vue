import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * @description Response object
 * @typedef {Object} Expense Request
 * @property {Number} ID - State city identifier
 * @property {string} Expenses - Rural territory name
 * @property {string} Description - Municipality territory code
 * @property {string} Type - Type of an action that happened to money
 */

export const useMainStore = defineStore('main-store',()=>{

 const initialValues=ref({
    ID:[],
    Expenses:[],
    Description:[],
    Type:[]
 });



return {
   initialValues,

  };

});