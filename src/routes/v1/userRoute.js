import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'view user' })
  })
  .post((req, res) => {
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'User created successfully!' })
  })

export const userRoute = Router
