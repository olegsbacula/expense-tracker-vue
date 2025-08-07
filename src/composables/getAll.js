import axios from 'axios'

/**
 * Create a new task.
 *
 * @param {string} expenses    — Expense
 * @param {string} description    — Expense's description 
 * @param {string} expense_type     — Expense type
 */

export async function getAllValues(){
    try{
        const req = await axios.get ("http://localhost:3000/getAllRecords")
        return req.data
    }
    catch(err){
        console.error('Failed to get all expenses or incomes:', err)
        throw err
    }
}