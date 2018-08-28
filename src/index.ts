import { connectDatabase } from './databaseConnection'
import { createKoaServer, Action, BadRequestError } from 'routing-controllers'
import PopulateController from './controllers/Populate'
import ActivityController from './controllers/adminControllers/ActivityController'
import { verify } from './jwt'
import { Member } from './entities/Member'
import MemberController from './controllers/MemberController'
import LoginController from './controllers/LoginController'

export const app = createKoaServer({
  cors: true,
  controllers: [
    PopulateController,
    ActivityController,
    MemberController,
    LoginController
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

connectDatabase()
  .then(_ => {
    app.listen(4000, () => {
      console.log('Server is on 4000')
    })
  })
  .catch(err => console.error(err))
