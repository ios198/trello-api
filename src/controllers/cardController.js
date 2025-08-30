import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'
const createCard = async (req, res) => {
  try {
    const newCard = await cardService.createNew(req.body)
    res.status(StatusCodes.CREATED).json({
      message: 'Card created successfully!',
      data: newCard,
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
      error: error.message,
    })
  }
}

export const cardController = {
  createCard,
}
