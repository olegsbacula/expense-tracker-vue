import axios from 'axios'

/**
 * Create a new task.
 * @param {string} id    — Expense's Identification
 */

export async function postANewExpense(formValues){
    try{
        const req = await axios.post ("http://localhost:3000/post",{
            expenses: formValues.expenses,
            description: formValues.description,
            type: formValues.type,
        })
        return req.data
    }
    catch(err){
        console.error('Failed to create a new expense:', err)
        throw err
    }
}