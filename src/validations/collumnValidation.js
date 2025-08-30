const Joi = require('joi')
import { StatusCodes } from 'http-status-codes'

const createColumn = async (req, res, next) => {
  const collumnScheme = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional(),
  })

  try {
    const value = await collumnScheme.validateAsync(req.body)
    next()
  } catch (error) {
    console.log(error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message })
  }
}
export const columnValidation = {
  createColumn,
}
