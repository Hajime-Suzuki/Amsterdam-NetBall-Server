import {
  JsonController,
  Post,
  Param,
  Get,
  Body,
  Authorized,
  UnauthorizedError,
  BadRequestError
} from 'routing-controllers'
import { Member } from '../entities/Member'

@JsonController()
export default class MemberController {
  @Post('/signup')
  signup(@Body() data: Member) {
    return Member.create(data).save()
  }

  @Authorized()
  @Get('/members/:id([0-9]+)')
  getUser(@Param('id') id: number) {
    return Member.findOne(id)
  }

  @Authorized()
  @Get('/members')
  allUsers() {
    return Member.find()
  }

  // @Post('/login')
  // async login(@Body() { email, password }: LoginParams) {
  //   const member = await Member.findOne({ email })
  //   if (await member.checkPassword(password))
  //     throw new BadRequestError('password and email do not match')
  // }
}
