import axios from 'axios'

/**
 * Get all expenses
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