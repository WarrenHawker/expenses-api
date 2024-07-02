//import packages
import cors from 'cors';
import express from 'express';
import { router as expenseRoutes } from './expenses.routes';

//initialise express app
export const app = express();

//middleware
app.use(express.json());
app.use(cors());

// Base API path
const apiBasePath = '/api/v1';

// Routes
app.use(`${apiBasePath}/expense`, expenseRoutes);
