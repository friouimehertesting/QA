import { Router } from "express";
import { login, register, logout } from "../controllers/index.js";

const userRouter = Router()

userRouter.post('/login', login)
userRouter.post('/register', register)
userRouter.get('/logout', logout)

export default userRouter