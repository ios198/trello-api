/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from './boadRoute.js'
import { columnRoute } from './columnRoute.js'
import { cardRoute } from './cardRoute.js'
import { userRoute } from './userRoute.js'

const Router = express.Router()

/* APIs v1/status */
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ status: 'OK' })
})

/* Boards api */
Router.use('/boards', boardRoute)
/* Columns api */
Router.use('/columns', columnRoute)
/* Cards api */
Router.use('/cards', cardRoute)
/* User api */
Router.use('/users', userRoute)

export const APIs_V1 = Router
