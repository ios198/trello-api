import mongoose from 'mongoose'
import Joi from 'joi'
//Define Collection
const BOARD_COLLECTION = 'boards'

const BOARD_SCHEMA = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: false },
    columnOrderIds: { type: [String], required: false, default: [] },
  },
  {
    timestamps: true,
    collection: BOARD_COLLECTION,
  }
)

const validateBeforeCreate = async (reqBody) => {
  const boardScheme = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional(),
    slug: Joi.string().min(3).max(100).optional(),
    columnOrderIds: Joi.array().items(Joi.string().length(24)).optional(),
  })
  return await boardScheme.validateAsync(reqBody, { abortEarly: false })
}
const Board = mongoose.model('Board', BOARD_SCHEMA)
const createNew = async (reqBody) => {
  try {
    const validationResult = await validateBeforeCreate(reqBody)
    const newBoard = new Board(validationResult)
    return await newBoard.save() // Save the new board instance to the database
  } catch (error) {
    throw new Error('Error creating board model ' + error.message)
  }
}

const getDetails = async (boardId) => {
  try {
    return await Board.findById(boardId)
  } catch (error) {
    throw new Error('Error retrieving board details: ' + error.message)
  }
}

export const boardModel = {
  BOARD_COLLECTION,
  BOARD_SCHEMA,
  createNew,
  getDetails,
}
