import { connectDatabase } from './databaseConnection'
import { createKoaServer, Action, BadRequestError } from '../node_modules/routing-controllers'
import PopulateController from './controllers/Populate'
import LoginController from './controllers/LoginController'
import MemberController from './controllers/MemberController'
import { verify } from './jwt'
import { Member } from './entities/Member'

export const app = createKoaServer({
  cors: true,
  controllers: [
    PopulateController,
    LoginController,
    MemberController
  ],
  // authorizationChecker: (action: Action) => {
  //     const token: string = action.request.headers.authorization
  //     try {
  //         return !!(token && verify(token))
  //     } catch (e) {
  //         throw new BadRequestError(e)
  //     }
  // },
  // currentUserChecker: async (action: Action) => {
  //     const token: string = action.request.headers.authorization

  //     if (token) {
  //         const { id } = verify(token)
  //         return Member.findOne({ id })
  //     }

  //     return undefined
  // }
})

connectDatabase()
  .then(_ => {
    app.listen(4000, () => {
      console.log('Server is on 4000')
    })
  })
  .catch(err => console.error(err))
