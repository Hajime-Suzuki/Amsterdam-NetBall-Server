import * as dotenv from 'dotenv'
import 'reflect-metadata'
import { Action, BadRequestError, createKoaServer } from 'routing-controllers'
import { connectDatabase } from './databaseConnection'
dotenv.config()

export const app = createKoaServer({
  cors: true,
  controllers: []
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
