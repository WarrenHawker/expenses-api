import express from 'express';
import { createExpense } from './controllers/create-expense.controller';
import { deleteExpense } from './controllers/delete-expense.controller';
import { getExpenses } from './controllers/get-expenses.controller';
import { updateExpense } from './controllers/update-expense.controller';
export const router = express.Router();

router.get('/', getExpenses);
router.post('/', createExpense);
router.patch('/:id', updateExpense);
router.delete('/:id', deleteExpense);
