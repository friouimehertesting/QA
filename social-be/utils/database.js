
import mongoose from "mongoose";
import dotenv from 'dotenv'
import chalk from "chalk";
dotenv.config()

const MONGO = process.env.MONGO
const connectDB = async () => {
  mongoose
    .connect(MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log(chalk.yellow('✓'), chalk.blue('Connected Successfully to MongoDB')))
    .catch((err) => console.log(chalk.red('Not Connected to MongoDB', err)));
}


export default connectDB