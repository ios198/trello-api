import Board from '~/models/boardModel'
import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'
import { BOARD_TYPES } from '~/utils/constants'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
const createNew = async (reqBody) => {
  // Logic to create a new board using reqBody
  try {
    // Simulate board creation logic
    const newBoardData = {
      ...reqBody,
    }
    return await boardModel.createNew(newBoardData) // khởi tạo instance từ model
    // Here you would typically save the new board to a database
  } catch (error) {
    throw new Error('Error creating board: ' + error.message)
  }
}
const getDetails = async (boardId) => {
  const board = await boardModel.Board.findById(boardId)
    .populate({
      path: 'columns',
      populate: { path: 'cards' },
    })
    .lean()
  return board
}
export const boardService = {
  createNew,
  getDetails,
}
