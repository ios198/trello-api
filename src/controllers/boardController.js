import express from 'express'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError.js'
import { boardService } from '~/services/boardService.js'
const createBoard = async (req, res, next) => {
  try {
    // điều hướng sang service
    const createdNewBoard = await boardService.createNew(req.body)
    // có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json({
      message: 'Board created successfully!',
      data: createdNewBoard,
    })
    //throw new ApiError(StatusCodes.BAD_GATEWAY, 'Test Error') // Simulating an error for testing
  } catch (error) {
    next(error) // Pass the error to the next middleware for centralized error handling
  }
}

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id
    const board = await boardService.getDetails(boardId)
    if (!board) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Board not found', data: board })
    }

    return res.status(StatusCodes.OK).json(board)
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createBoard,
  getDetails,
}
