import { Router } from "express";
import {
  getPost, getPosts, updatePost, deletPost, createPost,
  likePost, unLikePost, commentPost,
  editCommentPost, deleteCommentPost,
  getPostByUserId
} from "../controllers/post.controller.js";
import { UserAuth } from "../middleware/auth.middleware.js";

const postRouter = Router()

postRouter.get('/', getPosts)
postRouter.get('/:id', getPost)
postRouter.get('/:posterId/user', getPostByUserId)
postRouter.post('/', UserAuth, createPost)
postRouter.put('/:id', UserAuth, updatePost)
postRouter.delete('/:id', UserAuth, deletPost)
// like ,unlike Post
postRouter.patch('/like/:id', UserAuth, likePost)
postRouter.patch('/unlike/:id', UserAuth, unLikePost)

// Comments
postRouter.patch('/:postId/comment/add', UserAuth, commentPost)
postRouter.patch('/:postId/comment/:id/edit', UserAuth, editCommentPost)
postRouter.patch('/:postId/comment/:id/delete', UserAuth, deleteCommentPost)


export default postRouter


