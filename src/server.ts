import mongoose from 'mongoose';
import { app } from './app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 6000;
const mongodb = process.env.MONGO_DB || 'mongodb://localhost:8080';

app.listen(port, async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await mongoose.connect(mongodb, {
    dbName: 'expenses',
  });
  console.log(`server running on port ${port}`);
});
