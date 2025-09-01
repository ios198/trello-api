const Joi = require('joi')
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
const createCard = async (req, res, next) => {
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
    const value = await cardScheme.validateAsync(req.body)
    next()
  } catch (error) {
    console.log(error)
    const mesErr = error.message
    const newErr = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, mesErr)
    next(newErr)
  }
}
export const cardValidation = {
  createCard,
}
