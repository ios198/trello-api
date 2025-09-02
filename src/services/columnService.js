import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
const createNew = async (reqBody) => {
  try {
    const newColumn = await columnModel.createNew(reqBody)
    // 2. Update columnOrderIds trong Board
    await boardModel.Board.findByIdAndUpdate(
      '68b408360c2a2b98e09d4265',
      { $push: { columnOrderIds: newColumn._id } }, // thêm vào cuối
      { new: true }
    )
    return newColumn
  } catch (error) {
    throw new Error('Error creating column: ' + error.message)
  }
}

export const columnService = {
  createNew,
}
