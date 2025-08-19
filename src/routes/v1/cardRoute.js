import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { cardValidation } from '~/validations/cardValidation.js'
const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'view card' })
  })
  .post(cardValidation.createCard)

export const cardRoute = Router
