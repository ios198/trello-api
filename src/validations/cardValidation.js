const Joi = require('joi')
import { StatusCodes } from 'http-status-codes'

const createCard = async (req, res) => {
  const cardScheme = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).optional(),
  })

  try {
    const value = await cardScheme.validateAsync(req.body)
    console.log(value)
    res.status(StatusCodes.CREATED).json({
      message: 'Card created successfully!',
      data: value,
    })
  } catch (error) {
    console.log(error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message })
  }
}
export const cardValidation = {
  createCard,
}
