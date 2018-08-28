import { connectDatabase } from './databaseConnection'
import { createKoaServer } from 'routing-controllers'
import PopulateController from './controllers/Populate'
import ActivityController from './controllers/adminControllers/ActivityController'

export const app = createKoaServer({
  cors: true,
  controllers: [PopulateController, ActivityController]
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
  //         return User.findOne({ id })
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
