import { User } from "../models/index.js"


const uploadProfile = async (req, res) => {
  try {

    const { user } = req
    const { picture } = req.body
    if (!picture) {
      return res.status(400).json({ error: 'You do not have Picture.', success: false })
    }
    const updatePicture = await User.findByIdAndUpdate(user.id, { picture }, { upsert: true, new: true, setDefaultsOnInsert: true })
    return res.status(200).json({ message: updatePicture, success: true })

  } catch (error) {
    return res.status(400).json({ message: 'Your request could not be proceed ,try again.' + error, success: false })

  }

}

export { uploadProfile }