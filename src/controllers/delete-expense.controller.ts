import { Request, Response } from 'express';
import { ErrorReturn } from '../types/error-return';
import Expense from '../expenses-model.mongoose';

export const deleteExpense = async (req: Request, res: Response) => {
  const expenseId = req.params.id;

  try {
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);
    if (!deletedExpense) {
      const error: ErrorReturn = {
        code: 401,
        message: 'Expense not found',
      };
      res.status(401).json(error);
      return;
    }
    res.status(200).json(deletedExpense);
  } catch (err) {
    const error: ErrorReturn = {
      code: 500,
      message: (err as Error).message,
    };
    res.status(500).json(error);
    return;
  }
};
