/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import connectDB from '~/config/mongodb.js'
import env from '~/config/environment.js'
import { APIs_V1 } from '~/routes/v1/index.js'
import { errorHandlingMiddleware } from '~/middlewares/errorHandelingMiddleware'
import cors from 'cors'
import { corsOptions } from './config/cors'
const app = express()

// Connect to MongoDB
connectDB()

// Middleware xử lý CORS
app.use(cors(corsOptions))
// Middleware để parse JSON body
app.use(express.json())

app.use('/v1', APIs_V1)

//Middleware handling
app.use(errorHandlingMiddleware)

app.listen(env.APP_PORT, env.APP_HOST, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Hello Trung Quan Dev, I am running at ${env.APP_HOST}:${env.APP_PORT}/`
  )
})
