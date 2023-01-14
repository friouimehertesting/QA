import { Post, User } from "../models/index.js";
import checkIfValid from "../utils/check-valid-id.js";

const getPosts = async (req, res) => {
  const { cat } = req.query

  try {
    const posts = cat ? await Post.find({ cat })
      .populate("posterId likers").select('-password')
      .populate({
        path: 'comments',
        populate: {
          path: 'commentId'
        }
      })
      .sort({ createdAt: -1 })
      : await Post.find()
        .populate("posterId likers").select('-password')
        .populate({
          path: 'comments',
          populate: {
            path: 'commentId'
          }
        })
        .sort({ createdAt: -1 })
    return res.status(200).json({ data: posts, success: true });
  } catch (error) {
    return res.status(400).json({ error: 'Your Request could not be proceed,Please try again.' + error, success: false });
  }
}

const getPost = async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findById(id)
    return res.status(200).json({ data: post, success: true });
  } catch (error) {
    return res.status(400).json({
      error: 'Your Request could not be proceed,Please try again.', success: false
    });
  }
}

const getPostByUserId = async (req, res) => {
  try {
    const { posterId } = req.params
    const post = await Post.find({ posterId }).populate("posterId likers").select('-password')
      .populate({
        path: 'comments',
        populate: {
          path: 'commentId'
        }
      })
      .sort({ createdAt: -1 })
    return res.status(200).json({ data: post, success: true });
  } catch (error) {
    return res.status(400).json({
      error: 'Your Request could not be proceed,Please try again.', success: false
    });
  }
}

const createPost = async (req, res) => {

  try {
    const userId = req.user._id
    const { title, likers, comments, video, img, desc, cat } = req.body
    if (!title) {
      return res.status(400).json({
        error: 'You must provide a title.', success: false
      });
    }
    if (!desc) {
      return res.status(400).json({
        error: 'You must provide a description.', success: false
      });
    }
    if (!cat) {
      return res.status(400).json({
        error: 'You must provide a category.', success: false
      });
    }
    const newPost = new Post({
      title,
      desc,
      likers,
      comments,
      video,
      img,
      cat,
      posterId: userId
    })
    const savedPost = await newPost.save()
    return res.status(200).json({ data: savedPost, success: true });
  } catch (error) {
    return res.status(400).json({ error: 'Your Request could not be proceed,Please try again.' + error, success: false });
  }
}

const updatePost = async (req, res) => {

  try {
    const { id } = req.params
    const validPostId = checkIfValid(id)
    if (!validPostId) {
      return res.status(400).json({ error: `${id} is not a valid Id.`, success: false })
    }

    const { title, desc, cat } = req.body
    const updatedPost = await Post.findByIdAndUpdate(id, {
      $set: {
        title,
        desc,
        cat
      }
    }, { new: true, upsert: true, setDefaultsOnInsert: true })

    return res.status(200).json({ data: updatedPost, success: true });
  } catch (error) {
    return res.status(400).json({ error: 'Your Request could not be proceed,Please try again.' + error, success: false });
  }
}

const deletPost = async (req, res) => {
  try {
    const { id } = req.params
    const validPostId = checkIfValid(id)
    if (!validPostId) {
      return res.status(400).json({ error: `${id} is not a valid Id.`, success: false })
    }
    await Post.findByIdAndDelete(id)
    return res.status(200).json({ message: "Post Deleted !", success: true });
  } catch (error) {
    return res.status(400).json({ error: 'Your Request could not be proceed,Please try again.' + error, success: false });
  }
}

const likePost = async (req, res) => {
  try {
    const userId = req.user._id
    const { id } = req.params
    const validPostId = checkIfValid(id)
    if (!validPostId) {
      return res.status(400).json({ error: `${id} is not a valid Id.`, success: false })
    }

    const loggedUser = await User.findById(userId)
    const likedPost = await Post.findById(id)
    if (!likedPost) {
      return res.status(400).json({ message: "No Post found.", success: false });
    }

    if (!likedPost.likers.includes(loggedUser._id)) {
      await User.findByIdAndUpdate(userId, {
        $push: {
          likes: id
        }
      })

      await Post.findByIdAndUpdate(id, {
        $push: {
          likers: userId
        }
      }, { new: true, upsert: true, setDefaultsOnInsert: true })
      return res.status(200).json({ message: `Post ${likedPost.title} liked successfully!`, success: false });

    } else {
      return res.status(200).json({ message: `This Post ${likedPost.title} Already Liked !`, success: false });
    }

  } catch (error) {
    return res.status(400).json({ error: 'Your Request could not be proceed,Please try again.' + error, success: false });
  }
}

const unLikePost = async (req, res) => {
  try {
    const { id } = req.params
    const validPostId = checkIfValid(id)
    if (!validPostId) {
      return res.status(400).json({ error: `${id} is not a valid Id.`, success: false })
    }
    const userId = req.user._id

    const loggedUser = await User.findById(userId)
    const likedPost = await Post.findById(id)
    if (!likedPost) {
      return res.status(400).json({ message: "No Post found.", success: false });
    }

    if (likedPost.likers.includes(loggedUser._id)) {
      await User.findByIdAndUpdate(userId, {
        $pull: {
          likes: id
        }
      })

      await Post.findByIdAndUpdate(id, {
        $pull: {
          likers: userId
        }
      }, { new: true, upsert: true, setDefaultsOnInsert: true })
      return res.status(200).json({ message: `Post ${likedPost.title} unliked successfully!`, success: false });

    } else {
      return res.status(200).json({ message: `This Post ${likedPost.title} Already unliked !`, success: false });
    }

  } catch (error) {
    return res.status(400).json({ error: 'Your Request could not be proceed,Please try again.' + error, success: false });
  }
}


const commentPost = async (req, res) => {
  try {
    const { postId } = req.params
    const validPostId = checkIfValid(postId)
    if (!validPostId) {
      return res.status(400).json({ error: `${postId} is not a valid Id.`, success: false })
    }

    const post = await Post.findById(postId)
    if (!post) {
      return res.status(400).json({ message: "No Post found.", success: false });
    }

    const { text } = req.body
    if (!text) {
      return res.status(400).json({ message: "You must provide a text", success: false });
    }
    const { user } = req

    const addComment = await Post.findByIdAndUpdate(postId, {
      $push: {
        comments: {
          commentId: user._id,

          text,
          timestamp: new Date()
        }
      }
    }
      , { upsert: true, new: true, setDefaultsOnInsert: true })


    return res.status(200).json({ data: addComment, success: false });

  } catch (error) {
    return res.status(400).json({ error: 'Your Request could not be proceed,Please try again.' + error, success: false });
  }
}

const editCommentPost = async (req, res) => {
  try {
    const { text } = req.body
    if (!text) {
      return res.status(400).json({ message: "You must provide a text", success: false });
    }
    const { id, postId } = req.params
    const validCommentId = checkIfValid(id)
    if (!validCommentId) {
      return res.status(400).json({ error: `${id} is not a valid Id.`, success: false })
    }

    const validPostId = checkIfValid(postId)
    if (!validPostId) {
      return res.status(400).json({ error: `${postId} is not a valid Id.`, success: false })
    }

    const post = await Post.findById(postId)
    if (!post) {
      return res.status(400).json({ message: "No Post found.", success: false });
    }
    const commentFound = post?.comments?.find((item) => item._id.equals(id))
    if (!commentFound) {
      return res.status(404).json({ error: 'No Comment Found.', success: false });
    }
    commentFound.text = text
    const updatedComment = await post.save()
    return res.status(200).json({ data: updatedComment, success: true });
  } catch (error) {
    return res.status(400).json({ error: 'Your Request could not be proceed,Please try again.' + error, success: false });
  }
}

const deleteCommentPost = async (req, res) => {
  try {

    const { id, postId } = req.params
    const validPostId = checkIfValid(postId)
    if (!validPostId) {
      return res.status(400).json({ error: `${postId} is not a valid Id.1`, success: false })
    }

    const validCommentId = checkIfValid(id)
    if (!validCommentId) {
      return res.status(400).json({ error: `${id} is not a valid Id.`, success: false })
    }

    const deleteCommentPost = await Post.findByIdAndUpdate(postId, {
      $pull: {
        comments: { _id: id }
      }
    }, { upsert: true, new: true, setDefaultsOnInsert: true })

    return res.status(200).json({ data: deleteCommentPost, success: true });

  } catch (error) {
    return res.status(400).json({ error: 'Your Request could not be proceed,Please try again.' + error, success: false });
  }
}

export {
  getPosts, getPost, updatePost, deletPost, createPost, likePost,
  unLikePost, commentPost, editCommentPost, deleteCommentPost,
  getPostByUserId
}