import mongoose from 'mongoose'
import { CARD_COLLECTION } from '~/utils/constants'
import Joi from 'joi'
const CARD_SCHEMA = new mongoose.Schema(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    columnId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Column',
      required: true,
    },

    title: { type: String, required: true },
    description: { type: String },
    cover: { type: String },

    memberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: String }],
    attachments: [{ type: String }],
  },
  {
    timestamps: true,
    collection: CARD_COLLECTION,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)
const validateBeforeCreate = async (reqBody) => {
  const cardScheme = Joi.object({
    boardId: Joi.string().length(24).required(),
    columnId: Joi.string().length(24).required(),
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional(),
    cover: Joi.string().optional(),
    memberIds: Joi.array().items(Joi.string().length(24)).optional(),
    comments: Joi.array().items(Joi.string()).optional(),
    attachments: Joi.array().items(Joi.string()).optional(),
  })

  try {
    const value = await cardScheme.validateAsync(reqBody)
    return value
  } catch (error) {
    throw new Error('Validation error: ' + error.message)
  }
}
const Card = mongoose.model('Card', CARD_SCHEMA)
const createNew = async (reqBody) => {
  try {
    const validationResult = await validateBeforeCreate(reqBody)
    const newCard = new Card(validationResult)
    return await newCard.save() // Save the new card instance to the database
  } catch (error) {
    throw new Error('Error creating card: ' + error.message)
  }
}

export const cardModel = {
  CARD_COLLECTION,
  CARD_SCHEMA,
  Card,
  createNew,
}
