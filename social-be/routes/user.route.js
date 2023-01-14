import { Router } from "express";
import {
  getUser, getUsers, updateUser, updateProfileUser, deleteUser,
  follow, unfollow, getFollowing, getSuggestionUsers
} from "../controllers/user.controller.js";
import { UserAuth } from "../middleware/index.js";

const userRouter = Router()

// Routes for user.
userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)
userRouter.get('/:id/following', getFollowing)
userRouter.get('/:id/suggestions', UserAuth, getSuggestionUsers)

userRouter.put('/:id', UserAuth, updateUser)
userRouter.put('/:id/profile', UserAuth, updateProfileUser)
userRouter.put('/:id', UserAuth, updateProfileUser)
userRouter.delete('/:id', UserAuth, deleteUser)

// Route for followers.
userRouter.patch('/follow', UserAuth, follow)
userRouter.patch('/unfollow', UserAuth, unfollow)


export default userRouter