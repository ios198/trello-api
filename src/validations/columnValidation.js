const Joi = require('joi')
import { StatusCodes } from 'http-status-codes'

const createColumn = async (req, res, next) => {
  const columnScheme = Joi.object({
    boardId: Joi.string().length(24).required(),
    title: Joi.string().min(3).max(100).required(),
    cardOrderIds: Joi.array().items(Joi.string().length(24)).optional(),
  })

  try {
    const value = await columnScheme.validateAsync(req.body)
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
