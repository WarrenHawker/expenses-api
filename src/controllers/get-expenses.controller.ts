import { Request, Response } from 'express';
import Expense from '../expenses-model.mongoose';
import { ErrorReturn } from '../types/error-return';

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.find({});
    res.status(200).json(expenses);
  } catch (err) {
    const error: ErrorReturn = {
      code: 500,
      message: (err as Error).message,
    };
    res.status(500).json(error);
    return;
  }
};
