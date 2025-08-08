import axios from 'axios'

/**
 * Delete the expense.
 * @param {string} id    — Expense's Identification
 */

export async function DeleteExpense(id) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/deleteExpense/${id}`
    );
    window.location.reload()
    return response.data;
  } catch (err) {
    console.error('Failed to delete the expense:', err);
    throw err;
  }
}