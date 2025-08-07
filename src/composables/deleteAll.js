import axios from 'axios'

/**
 * Delete the expense.
 * @param {string} id    — Expense's Identification
 */

export async function DeleteAllExpense() {
  try {
    const response = await axios.delete(
      `http://localhost:3000/deleteAllExpense`
    );
    window.location.reload()
    return response.data;
  } catch (err) {
    console.error('Failed to delete all expenses:', err);
    throw err;
  }
}