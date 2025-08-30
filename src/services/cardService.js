import { cardModel } from '~/models/cardModel'
const createNew = async (reqBody) => {
  try {
    const newCard = {
      id: 'card_id', // Example ID generation
      ...reqBody,
    }
    return await cardModel.createNew(reqBody)
  } catch (error) {
    throw new Error('Error creating card: ' + error.message)
  }
}

export const cardService = {
  createNew,
}
