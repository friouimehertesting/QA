
import { User } from "../models/index.js"
import checkIfValid from "../utils/check-valid-id.js"

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.status(200).json({ data: users, success: true })
  } catch (error) {
    res.status(400).json({ error: "Your Request could not be proceed,Please try again.", success: false })
  }
}
const getUser = async (req, res) => {
  const { id } = req.params
  const valid = checkIfValid(id)

  if (!valid) {
    return res.status(400).json({ error: `${id} is not valid.`, success: false })
  }

  try {
    const users = await User.findById(id).select('-password')
    res.status(200).json({ data: users, success: true })
  } catch (error) {
    res.status(400).json({ error: "Your Request could not be proceed,Please try again.", success: false })
  }
}

const getFollowing = async (req, res) => {

  try {
    const { id } = req.params
    const valid = checkIfValid(id)
    if (!valid) {
      return res.status(400).json({ error: `${id} is not valid.`, success: false })
    }
    const friends = await User.findById(id).select('-password').populate('following')
    res.status(200).json({ data: friends, success: true })

  } catch (error) {
    res.status(400).json({ error: "Your Request could not be proceed,Please try again.", success: false })

  }
}

const getSuggestionUsers = async (req, res) => {

  try {
    const { id } = req.params
    const valid = checkIfValid(id)
    if (!valid) {
      return res.status(400).json({ error: `${id} is not valid.`, success: false })
    }
    const { user } = req
    const followers = user.following
    const suggestionsFriends = await User.find()

    console.log('Followers', followers)

    res.status(200).json({ data: suggestionsFriends, success: true })

  } catch (error) {
    res.status(400).json({ error: "Your Request could not be proceed,Please try again.", success: false })

  }
}

const updateUser = async (req, res) => {
  const { id } = req.params
  const { pseduo, email, bio } = req.body
  const valid = checkIfValid(id)
  if (!valid) {
    return res.status(400).json({ error: `${id} is not valid.`, success: false })
  }
  try {
    const updateUser = await User.findOneAndUpdate({ _id: id }, {

      $set: {
        bio
      }
    },
      {
        new: true, upsert: true, setDefaultsOnInsert: true
      }
    )
    return res.status(200).json({ data: updateUser, success: false })

  } catch (error) {
    return res.status(400).json({ error: "Your Request could not be proceed,Please try again.", success: false })
  }
}

const updateProfileUser = async (req, res) => {
  const { pseudo, email, position, desc, location, language, phone, bio } = req.body
  try {
    const { user } = req
    const checkExistingUser = await User.findOne({ email: user?.email })
    if (!checkExistingUser) {
      return res.status(400).json({ message: `No User found by this Email ${email}.`, success: false })
    }
    const updatedUserProfile = await User.findByIdAndUpdate(user._id, {
      pseudo, email, position, desc, location, language, phone, bio
    }, {
      upsert: true, new: true, setDefaultsOnInsert: true
    })
    return res.status(200).json({ data: updatedUserProfile, success: false })
  } catch (error) {
    return res.status(400).json({ error: "Your Request could not be proceed,Please try again.", success: false })
  }
}
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const valid = checkIfValid(id)

    if (!valid) {
      return res.status(400).json({ error: `${id} is not a valid`, success: false })
    }
    await User.findByIdAndDelete(id)
    res.status(200).json({ message: 'User deleted successfully.', success: true })

  } catch (error) {
    return res.status(400).json({ error: "Your Request could not be proceed,Please try again.", success: false })
  }
}

const follow = async (req, res) => {
  const { _id: id } = req.user
  const { idToFollow } = req.body
  const validId = checkIfValid(id)

  if (!validId) {
    return res.status(400).json({ error: `${id} is not a valid`, success: false })
  }
  const validIdToFollow = checkIfValid(idToFollow)

  if (!validIdToFollow) {
    return res.status(400).json({
      error: `${idToFollow} is not a valid`, success: false
    })
  }
  try {

    const LoggedUser = await User.findById(id)
    const exitFollowingUser = await User.findById(idToFollow)
    if (!LoggedUser.following.includes(exitFollowingUser.id)) {
      await User.findByIdAndUpdate(id, {
        $push: {
          following: idToFollow
        }
      })

      await User.findByIdAndUpdate(idToFollow, {
        $push: {
          followers: id
        }
      })

      res.status(200).json({ message: `You Follow ${exitFollowingUser.pseudo} successfully.`, success: true })
    } else {
      res.status(200).json({ message: `Aready Follow ${exitFollowingUser.pseudo}`, success: true })
    }

  } catch (error) {
    return res.status(400).json({ error: "Your Request could not be proceed,Please try again. " + error, success: false })
  }
}

const unfollow = async (req, res) => {
  try {
    const { _id: id } = req.user
    const { idUnFollow } = req.body
    const validId = checkIfValid(id)

    if (!validId) {
      return res.status(400).json({ error: `${id} is not a valid`, success: false })
    }
    const valididUnFollow = checkIfValid(idUnFollow)

    if (!valididUnFollow) {
      return res.status(400).json({
        error: `${idUnFollow} is not a valid`, success: false
      })
    }

    const LoggedUser = await User.findById(id)
    const exitFollowingUser = await User.findById(idUnFollow)

    if (LoggedUser.following.includes(exitFollowingUser.id)) {

      await User.findByIdAndUpdate(id, {
        $pull: {
          following: idUnFollow
        }
      })
      await User.findByIdAndUpdate(idUnFollow, {
        $pull: {
          followers: id
        }
      })
      res.status(200).json({ message: `Unfollowing ${exitFollowingUser.pseudo} successfully.`, success: true })
    } else {
      res.status(200).json({ message: `Already unfollowing ${exitFollowingUser.pseudo} `, success: true })
    }
  } catch (error) {
    return res.status(400).json({ error: "Your Request could not be proceed,Please try again." + error, success: false })
  }
}

export { getUsers, getUser, updateUser, deleteUser, follow, unfollow, updateProfileUser, getFollowing, getSuggestionUsers }