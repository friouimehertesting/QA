import ObjectID from 'mongoose'


const checkIfValid = (id) => {
  if (ObjectID.Types.ObjectId.isValid(id)) {
    return true
  }
  return false
}

export default checkIfValid