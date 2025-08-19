import { StatusCodes } from 'http-status-codes'

const createBoard = (req, res) => {
  try {
    res.status(StatusCodes.CREATED).json({
      message: 'Board created successfully!',
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}

export const boardController = {
  createBoard,
}
