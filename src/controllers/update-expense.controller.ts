import { Request, Response } from 'express';
import { ErrorReturn } from '../types/error-return';
import validator from 'validator';
import Expense from '../expenses-model.mongoose';

const { isEmpty, escape, isDate, isNumeric } = validator;

type ExpenseUpdateData = {
  amount?: number;
  type?: 'income' | 'expense';
  category?: string;
  date?: Date;
  description?: string;
};

export const updateExpense = async (req: Request, res: Response) => {
  let { amount, category, date, description } = req.body;
  const expenseId = req.params.id;

  const updateData: ExpenseUpdateData = {};

  if (amount) {
    if (!isNumeric(amount)) {
      const error: ErrorReturn = {
        code: 400,
        message: 'Invalid amount, must be a number',
        params: ['amount'],
      };
      res.status(400).json(error);
      return;
    } else {
      updateData.amount = parseFloat(amount);
    }
  }

  if (category) {
    updateData.category = escape(category).trim();
  }

  if (date) {
    if (!isDate(date)) {
      const error: ErrorReturn = {
        code: 400,
        message: 'Invalid date',
        params: ['date'],
      };
      res.status(400).json(error);
      return;
    } else {
      updateData.date = new Date(date);
    }
  }

  if (description) {
    updateData.description = escape(description).trim();
  }

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      updateData
    );

    if (!updatedExpense) {
      const error: ErrorReturn = {
        code: 401,
        message: 'Expense not found',
      };
      res.status(401).json(error);
      return;
    }
    res.status(200).json(updatedExpense);
  } catch (err) {
    const error: ErrorReturn = {
      code: 500,
      message: (err as Error).message,
    };
    res.status(500).json(error);
    return;
  }
};
