import jwt from 'jsonwebtoken'
import { User } from '../models/index.js';


const UserAuth = async (req, res, next) => {

  const { access_token } = req.cookies;

  if (!access_token) {
    return res.status(401).json({ message: "Please Login to Access", success: false });
  }

  jwt.verify(access_token, process.env.SECRET, async (error, decodedData) => {
    if (error) {
      return res.status(401).json({ message: "Token invalid.", success: false });

    } else {
      req.user = await User.findById(decodedData.id);
      next();
    }
  });
}


const AuthorPost = (id) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }
  if (!req.user._id === id) {
    return res.status(401).send('You are not allowed to for this Post.');
  }
  next()
}

export { UserAuth, AuthorPost }