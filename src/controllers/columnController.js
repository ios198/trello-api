import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'
const createColumn = async (req, res) => {
  try {
    const newColumn = await columnService.createNew(req.body)
    res.status(StatusCodes.CREATED).json({
      message: 'Column created successfully!',
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
      error: error.message,
    })
  }
}

export const columnController = {
  createColumn,
}
