import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { columnValidation } from '~/validations/collumnValidation'
const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'view column' })
  })
  .post(columnValidation.createColumn)

export const collumnRoute = Router
