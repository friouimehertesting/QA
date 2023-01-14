import express from "express";
import dotenv from 'dotenv'

import userRouter from "./user.route.js"
import authRouter from "./auth.route.js"
import postRouter from "./post.route.js";
import uploadRouter from "./upload.route.js";


dotenv.config()
const routes = express();
const BASE_URL_API = process.env.BASE_URL

routes.use(BASE_URL_API + '/auth', authRouter)
routes.use(BASE_URL_API + '/users', userRouter)
routes.use(BASE_URL_API + '/posts', postRouter)
routes.use(BASE_URL_API + '/upload', uploadRouter)



routes.use(BASE_URL_API, (req, res) => res.status(404).json({ error: 'No Endpoint found.', success: false }));



export { routes }