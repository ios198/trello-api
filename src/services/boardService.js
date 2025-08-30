import Board from '~/models/boardModel'
import { boardModel } from '~/models/boardModel'
const createNew = async (reqBody) => {
  // Logic to create a new board using reqBody
  try {
    // Simulate board creation logic
    const newBoardData = {
      ...reqBody,
      slug: 'learning-board',
      columnOrderIds: [],
    }
    return await boardModel.createNew(newBoardData) // khởi tạo instance từ model
    // Here you would typically save the new board to a database
  } catch (error) {
    throw new Error('Error creating board: ' + error.message)
  }
}
const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }
    return board
  } catch (error) {
    throw new Error('Error retrieving board details: ' + error.message)
  }
}
export const boardService = {
  createNew,
  getDetails,
}
