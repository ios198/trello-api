import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      id: 'column_id', // Example ID generation
      ...reqBody,
    }
    return await columnModel.createNew(reqBody)
  } catch (error) {
    throw new Error('Error creating column: ' + error.message)
  }
}

export const columnService = {
  createNew,
}
