import { IsString } from 'class-validator'
import {
  BadRequestError,
  Body,
  JsonController,
  Post
} from 'routing-controllers'
import { Member } from '../entities/Member'
import { sign } from '../jwt'

class AuthenticatePayload {
  @IsString()
  email: string

  @IsString()
  password: string
}

@JsonController()
export default class LoginController {
  @Post('/logins')
  async authenticate(@Body() { email, password }: AuthenticatePayload) {
    console.log('login')
    console.log(await Member.find())

    try {
      const user = await Member.findOne({ where: { email } })
      console.log(user)
      if (!user || !user.id)
        throw new BadRequestError('A user with this email does not exist')

      if (!(await user.checkPassword(password)))
        throw new BadRequestError('The password is not correct')

      const jwt = sign({ id: user.id, role: user.role.roleName })

      console.log(jwt)

      return { jwt }
    } catch (e) {
      console.log(e)
    }
  }
}
