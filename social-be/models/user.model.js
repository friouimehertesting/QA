import { model, Schema } from "mongoose";
import validator from 'validator';
const UserSchema = Schema({
  pseudo: {
    type: String,
    unique: true,
    trim: true,
    maxLenght: 20,
    minLenght: 3,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validator: [validator.isEmail],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    maxLenght: 200,
    minLenght: 6
  },
  picture: {
    type: String,
    default: '../images/default.jpeg'
  },
  bio: {
    type: String,
    max: 1024
  },
  desc: {
    type: String,
    max: 1024
  },
  following: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }]
  },
  followers: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }]
  },
  likes: {
    type: [String]
  },
  phone: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  position: {
    type: String,
    trim: true,
  },
  language: {
    type: String,
    trim: true,
  }
}, { timestamps: true })


const UserModel = model('User', UserSchema)



export default UserModel