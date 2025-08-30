const Joi = require('joi')
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
const createCard = async (req, res, next) => {
  const cardScheme = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional(),
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
