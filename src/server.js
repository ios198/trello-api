/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import { mapOrder } from '~/utils/sorts.js'
import connectDB from '~/config/mongodb.js'
import env from '~/config/environment.js'
import { APIs_V1 } from '~/routes/v1/index.js'

const app = express()

// Connect to MongoDB
connectDB()

app.use('/v1', APIs_V1)

// app.get('/', (req, res) => {
//   // Test Absolute import mapOrder
//   console.log(
//     mapOrder(
//       [
//         { id: 'id-1', name: 'One' },
//         { id: 'id-2', name: 'Two' },
//         { id: 'id-3', name: 'Three' },
//         { id: 'id-4', name: 'Four' },
//         { id: 'id-5', name: 'Five' },
//       ],
//       ['id-5', 'id-4', 'id-2', 'id-3', 'id-1'],
//       'id'
//     )
//   )
//   res.end('<h1>Hello World!</h1><hr>')
// })

app.listen(env.APP_PORT, env.APP_HOST, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Hello Trung Quan Dev, I am running at ${env.APP_HOST}:${env.APP_PORT}/`
  )
})
