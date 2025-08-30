import mongoose from 'mongoose'

//Define Collection
const CARD_COLLECTION = 'cards'

const CARD_SCHEMA = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: CARD_COLLECTION,
  }
)
const Card = mongoose.model('Card', CARD_SCHEMA)
const createNew = async (reqBody) => {
  try {
    const newCard = new Card(reqBody)
    return await newCard.save() // Save the new card instance to the database
  } catch (error) {
    throw new Error('Error creating card: ' + error.message)
  }
}

export const cardModel = {
  CARD_COLLECTION,
  CARD_SCHEMA,
  createNew,
}
