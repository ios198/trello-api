import mongoose from 'mongoose'
import { COLUMN_COLLECTION } from '~/utils/constants'
import Joi from 'joi'
//Define Collection

const COLUMN_SCHEMA = new mongoose.Schema(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    title: { type: String, required: true },

    cardOrderIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  },
  {
    timestamps: true,
    collection: COLUMN_COLLECTION,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// virtual để populate cards theo columnId
COLUMN_SCHEMA.virtual('cards', {
  ref: 'Card',
  localField: '_id',
  foreignField: 'columnId',
})

const validateBeforeCreate = async (reqBody) => {
  const columnScheme = Joi.object({
    boardId: Joi.string().length(24).required(),
    title: Joi.string().min(3).max(100).required(),
    cardOrderIds: Joi.array().items(Joi.string().length(24)).optional(),
  })

  try {
    const value = await columnScheme.validateAsync(reqBody)
    return value
  } catch (error) {
    throw new Error('Validation error: ' + error.message)
  }
}
const Column = mongoose.model('Column', COLUMN_SCHEMA)
const createNew = async (reqBody) => {
  try {
    const validationResult = await validateBeforeCreate(reqBody)
    const newColumn = new Column(validationResult)
    return await newColumn.save() // Save the new column instance to the database
  } catch (error) {
    throw new Error('Error creating column: ' + error.message)
  }
}

export const columnModel = {
  COLUMN_COLLECTION,
  COLUMN_SCHEMA,
  Column,
  createNew,
}
