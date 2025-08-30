const Joi = require('joi')
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
const createNewBoard = async (req, res, next) => {
  const boardScheme = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional(),
    slug: Joi.string().min(3).max(100).optional(),
    columnOrderIds: Joi.array().items(Joi.string().length(24)).optional(),
  })
  try {
    const result = await boardScheme.validateAsync(req.body)
    // validate data then move to controller
    next()
  } catch (error) {
    const errorMessage = error.details[0].message
    const customError = new ApiError(StatusCodes.BAD_REQUEST, errorMessage)
    next(customError) // Pass the error to the next middleware for centralized error handling
  }
}

export const boardValidation = {
  createNewBoard,
}
// Validate board data
