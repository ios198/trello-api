import mongoose from 'mongoose'

//Define Collection
const COLLUMN_COLLECTION = 'columns'

const COLLUMN_SCHEMA = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: COLLUMN_COLLECTION,
  }
)
const Column = mongoose.model('Column', COLLUMN_SCHEMA)
const createNew = async (reqBody) => {
  try {
    const newColumn = new Column(reqBody)
    return await newColumn.save() // Save the new column instance to the database
  } catch (error) {
    throw new Error('Error creating column: ' + error.message)
  }
}

export const columnModel = {
  COLLUMN_COLLECTION,
  COLLUMN_SCHEMA,
  createNew,
}
