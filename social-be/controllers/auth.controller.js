import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'
import validator from 'validator';


import { User } from "../models/index.js"

const login = async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ message: 'You must provide an email.', success: false })
    }
    if (!req.body.password) {
      return res.status(400).json({ message: 'You must provide password.', success: false })
    }

    const checkExistingUser = await User.findOne({ email })
    if (!checkExistingUser) {
      return res.status(400).json({ message: `No User found by this Email ${email}.`, success: false })
    }

    const isMatch = await bcryptjs.compare(req.body.password, checkExistingUser.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: 'Password Incorrect'
      });
    }

    const payload = {
      id: checkExistingUser.id
    };
    const secret = process.env.SECRET
    const tokenLife = process.env.EXPIRED_DATE

    const token = jwt.sign(payload, secret, { expiresIn: tokenLife });

    if (!token) {
      throw new Error();
    }
    const { password, ...info } = checkExistingUser._doc

    res.cookie('access_token', token, { httpOnly: true }).status(200).json({
      data: info
      , success: true
    })
  } catch (error) {
    return res.status(400).json({ error: 'Your request could not be processed ,Please try again' + error, success: false })

  }
}
const register = async (req, res) => {
  try {
    const { pseudo, email, bio } = req.body

    if (!email) {
      return res.status(400).json({ error: "You must enter an email.", success: false })
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "You must enter a valid email.", success: false })
    }
    if (!req.body.password) {
      return res.status(400).json({ error: "You must enter a password.", success: false })
    }
    if (!pseudo) {
      return res.status(400).json({ error: "You must enter a pseudo.", success: false })
    }
    const checkUser = await User.findOne({ email })
    if (checkUser) {
      return res.status(400).json({ error: "That email already in use.", success: false })
    }

    const salt = await bcryptjs.genSalt(10)
    const hashed = await bcryptjs.hash(req.body.password, salt)
    const newUser = new User({ pseudo, email, password: hashed, bio })
    const savedUser = await newUser.save()

    const payload = {
      id: savedUser._id
    }
    const SECRET = process.env.SECRET
    const EXPIRED_DATE = process.env.EXPIRED_DATE

    const token = jwt.sign(payload, SECRET, { expiresIn: EXPIRED_DATE })
    const { password, ...info } = savedUser._doc

    res.cookie("access_token", token, { httpOnly: true }).status(200).json({ data: info, success: true })
  } catch (error) {
    return res.status(400).json({ error: 'Your request could not be processed ,Please try again', success: false })
  }
}


const logout = async (req, res,) => {
  return res.clearCookie('access_token', {
    secure: true,
    sameSite: 'none'
  }).status(200).json({ message: 'User logged out.' });

}

export { login, register, logout }