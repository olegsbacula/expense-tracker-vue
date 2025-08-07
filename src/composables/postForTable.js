import axios from 'axios'

/**
 * Create a new task.
 *
 * @param {string} id     — Expense's ID
 * @param {string} expenses    — Expense
 * @param {string} description    — Expense's description 
 * @param {string} type     — Expense type
 * 
 */

export async function patchAnExpense(formTableValues){
    try{
        const req = await axios.patch (`http://localhost:3000/patch`,{
            id: formTableValues.id,
            expenses: String(formTableValues.expenses),
            description: formTableValues.description,
            type: formTableValues.type,
        })
        window.location.reload()
        return req.data
    }
    catch(err){
        console.error('Failed to create a new expense:', err)
        throw err
    }
}