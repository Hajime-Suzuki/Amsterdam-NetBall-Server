import { IsString } from 'class-validator'
import {
  JsonController,
  Post,
  Body,
  BadRequestError
} from 'routing-controllers'
import { sign } from '../jwt'
import { Member } from '../entities/Member'

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
    const user = await Member.findOne({ where: { email } })
    if (!user || !user.id)
      throw new BadRequestError('A user with this email does not exist')

    if (!(await user.checkPassword(password)))
      throw new BadRequestError('The password is not correct')

<<<<<<< HEAD
    if (!await user.checkPassword(password)) throw new BadRequestError('The password is not correct')
=======
    const jwt = sign({ id: user.id, role: user.role.roleName })
    console.log(jwt)
>>>>>>> master

    return { jwt }
  }
}
