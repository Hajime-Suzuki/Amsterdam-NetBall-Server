<<<<<<< HEAD
import { connectDatabase } from "./databaseConnection"
import { createKoaServer } from "routing-controllers"
import PopulateController from "./controllers/Populate"
import ActivityController from "./controllers/adminControllers/ActivityController"
import MemberController from "./controllers/MemberController"
import LoginController from "./controllers/LoginController"
=======
import { connectDatabase } from './databaseConnection'
import { createKoaServer, Action, BadRequestError } from 'routing-controllers'
import PopulateController from './controllers/Populate'
import ActivityController from './controllers/adminControllers/ActivityController'
import { verify } from './jwt'
import { Member } from './entities/Member'
import MemberController from './controllers/MemberController'
import LoginController from './controllers/LoginController'
>>>>>>> 6b3ef522d83ecc23cb373ed49178ae8480f1e8c4

export const app = createKoaServer({
  cors: true,
  controllers: [
    PopulateController,
    ActivityController,
    MemberController,
    LoginController
<<<<<<< HEAD
  ]
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
=======
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
>>>>>>> 6b3ef522d83ecc23cb373ed49178ae8480f1e8c4

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
      console.log("Server is on 4000")
    })
  })
  .catch(err => console.error(err))
