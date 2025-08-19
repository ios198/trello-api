const Joi = require('joi')
import { StatusCodes } from 'http-status-codes'

const createNewBoard = async (req, res, next) => {
  const boardScheme = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional(),
  })
  try {
    console.log(req.body)
    const result = await boardScheme.validateAsync(req.body)
    //next()
    // Log the request body for debugging
    res.status(StatusCodes.CREATED).json({
      message: 'Board created successfully!',
      data: result,
    })
  } catch (error) {
    console.log(error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message })
  }
}

export const boardValidation = {
  createNewBoard,
}
// Validate board data
