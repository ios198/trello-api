/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

/**
 * id:pass -  admin:admin
 */
import mongoose from 'mongoose'

const MONGGO_URL =
  'mongodb+srv://admin:admin@master.uecpo7o.mongodb.net/?retryWrites=true&w=majority&appName=Master'
const DATABASE_NAME = 'trello-api'

const connectDB = async () => {
  try {
    await mongoose.connect(MONGGO_URL, {
      dbName: DATABASE_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection failed:', error)
  }
}
module.exports = connectDB
