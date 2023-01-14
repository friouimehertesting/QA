import { model, Schema } from "mongoose";
import mongoose from "mongoose";

const PostSchema = Schema({
  posterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    trim: true,
    maxLength: 500,
  },
  img: {
    type: String,
    trim: true,

  },
  video: {
    type: String,
  },
  cat: {
    type: String,
    required: true
  },
  comments: {
    type: [
      {
        commentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        commentPseudo: String,
        text: String,
        timestamp: Number
      }
    ],
    required: true
  },
  desc: {
    type: String,
  },
  likers: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }]
  }
}, { timestamps: true })


const PostModel = model('Post', PostSchema)



export default PostModel