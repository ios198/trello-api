import { cardModel } from '~/models/cardModel'
const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody,
    }
    return await cardModel.createNew(newCard)
  } catch (error) {
    throw new Error('Error creating card: ' + error.message)
  }
}

export const cardService = {
  createNew,
}
