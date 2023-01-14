import { Router } from "express";


import { uploadProfile } from "../controllers/index.js";
import { UserAuth } from "../middleware/auth.middleware.js";


const uploadRouter = Router()

uploadRouter.post('/profile', UserAuth, uploadProfile)


export default uploadRouter