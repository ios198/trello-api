import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody,
    }
    return await columnModel.createNew(newColumn)
  } catch (error) {
    throw new Error('Error creating column: ' + error.message)
  }
}

export const columnService = {
  createNew,
}
