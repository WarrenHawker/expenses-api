import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the expense schema
const expenseSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Create the model from the schema and export it
const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
