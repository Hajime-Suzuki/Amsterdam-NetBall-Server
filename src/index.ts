import { connectDatabase } from './databaseConnection'
import { createKoaServer, Action, BadRequestError } from 'routing-controllers'
import PopulateController from './controllers/Populate'
import ActivityController from './controllers/adminControllers/ActivityController'
import { verify } from './jwt'
import { Member } from './entities/Member'
import MemberController from './controllers/MemberController'
import LoginController from './controllers/LoginController'
import MetaDataController from './controllers/MetaDataCotroller'
import CommitteeController from './controllers/CommitteeController'
import { updateAttendanceRate } from './controllers/libs/updateAttendanceRate'

export const app = createKoaServer({
  cors: true,
  controllers: [
    PopulateController,
    ActivityController,
    MemberController,
    LoginController,
    MetaDataController,
    CommitteeController
  ],
  authorizationChecker: (action: Action) => {
    const token: string = action.request.headers.authorization
    try {
      return !!(token && verify(token))
    } catch (e) {
      throw new BadRequestError(e)
    }
  },
  currentUserChecker: async (action: Action) => {
    const token: string = action.request.headers.authorization

    if (token) {
      const { id } = verify(token)
      return Member.findOne({ id })
    }

    return undefined
  }
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log('Server is on ' + PORT)
})
// connectDatabase()
//   .then(_ => {
//     app.listen(PORT, () => {
//       console.log('Server is on ' + PORT)
//     })
//     setInterval(updateAttendanceRate, 1000 * 3600 * 24)
//   })
//   .catch(err => console.error(err))
