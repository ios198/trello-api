import mongoose from 'mongoose'
import Joi, { valid } from 'joi'
import { BOARD_TYPES } from '~/utils/constants'
import { BOARD_COLLECTION } from '~/utils/constants'
//Define Collection

const BOARD_SCHEMA = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: [BOARD_TYPES.PRIVATE, BOARD_TYPES.PUBLIC],
    },
    ownerIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    memberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    columnOrderIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Column' }],
  },
  {
    timestamps: true,
    collection: BOARD_COLLECTION,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// virtual để populate columns theo boardId
BOARD_SCHEMA.virtual('columns', {
  ref: 'Column',
  localField: '_id',
  foreignField: 'boardId',
})

const validateBeforeCreate = async (reqBody) => {
  const boardScheme = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional(),
    type: Joi.string()
      .min(3)
      .max(100)
      .required()
      .valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE),

    ownerIds: Joi.array().items(Joi.string().length(24)).optional(),
    memberIds: Joi.array().items(Joi.string().length(24)).optional(),
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
    return Board.findById(boardId).lean()
  } catch (error) {
    throw new Error('Error retrieving board details: ' + error.message)
  }
}

export const boardModel = {
  BOARD_COLLECTION,
  BOARD_SCHEMA,
  Board,
  createNew,
  getDetails,
}
