import { Request, Response } from 'express';
import { ErrorReturn } from '../types/error-return';
import validator from 'validator';
import Expense from '../expenses-model.mongoose';

const { isEmpty, escape, isDate, isNumeric } = validator;

export const createExpense = async (req: Request, res: Response) => {
  let { amount, category, date, description } = req.body;

  // const missingFields = [];
  // if (!amount) {
  //   missingFields.push('amount');
  // }
  // if (!category) {
  //   missingFields.push('category');
  // }
  // if (!date) {
  //   missingFields.push('date');
  // }
  // if (!description) {
  //   missingFields.push('description');
  // }
  // if (missingFields.length > 0) {
  //   const error: ErrorReturn = {
  //     code: 400,
  //     message: 'Missing body parameters',
  //     params: missingFields,
  //   };
  //   res.status(400).json(error);
  //   return;
  // }
  const emptyFields = [];
  if (isEmpty(amount, { ignore_whitespace: true })) {
    emptyFields.push('amount');
  }
  if (isEmpty(category, { ignore_whitespace: true })) {
    emptyFields.push('category');
  }
  if (isEmpty(date, { ignore_whitespace: true })) {
    emptyFields.push('date');
  }
  if (isEmpty(description, { ignore_whitespace: true })) {
    emptyFields.push('description');
  }
  if (emptyFields.length > 0) {
    const error: ErrorReturn = {
      code: 400,
      message: 'Empty input fields',
      params: emptyFields,
    };
    res.status(400).json(error);
    return;
  }

  if (!isDate(date)) {
    const error: ErrorReturn = {
      code: 400,
      message: 'Invalid date',
      params: ['date'],
    };
    res.status(400).json(error);
    return;
  }

  if (!isNumeric(amount)) {
    const error: ErrorReturn = {
      code: 400,
      message: 'Invalid amount, must be a number',
      params: ['amount'],
    };
    res.status(400).json(error);
    return;
  }

  if (parseFloat(amount) < 0) {
    const error: ErrorReturn = {
      code: 400,
      message: 'Amount cannot be less than zero',
      params: ['amount'],
    };
    res.status(400).json(error);
    return;
  }

  const expenseData = {
    amount: parseFloat(amount),
    category: escape(category).trim(),
    date: new Date(date),
    description: escape(description).trim(),
  };

  try {
    const newExpense = new Expense(expenseData);
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    const error: ErrorReturn = {
      code: 500,
      message: (err as Error).message,
    };
    res.status(500).json(error);
    return;
  }
};
