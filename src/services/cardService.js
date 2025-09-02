import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
const createNew = async (reqBody) => {
  try {
    const newCard = await cardModel.createNew(reqBody)
    // 2. Update cardOrderIds trong Column
    await columnModel.Column.findByIdAndUpdate(
      '68b4d307eacf1c87578e3369',
      { $push: { cardOrderIds: newCard._id } }, // thêm vào cuối
      { new: true }
    )
    return newCard
  } catch (error) {
    throw new Error('Error creating card: ' + error.message)
  }
}

export const cardService = {
  createNew,
}
