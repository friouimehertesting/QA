import express from "express";
import dotenv from "dotenv"
import chalk from "chalk";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";


import { routes } from './routes/index.js'
import connectDB from "./utils/database.js";

mongoose.set('strictQuery', false);

dotenv.config()
const app = express();
app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use(routes)

const PORT = process.env.PORT || 6000

app.listen(PORT, () => {
  connectDB()
  console.log(chalk.blue('listening on port ' + PORT))
})