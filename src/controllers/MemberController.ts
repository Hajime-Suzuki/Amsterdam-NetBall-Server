import { JsonController, Post, Param, Get, Body, Authorized } from 'routing-controllers'
import Member from './entity';
//  

@JsonController()
export default class MemberController {

  @Post('/signup')
  async signup(
    @Body() data: Member
  ) {
    const {password, ...rest} = data
    const entity = Member.create(rest)
    await entity.setPassword(password)

    const user = await entity.save()

    return user
  }

  @Authorized()
  @Get('/members/:id([0-9]+)')
  getUser(
    @Param('id') id: number
  ) {
    return Member.findOne(id)
  }

  @Authorized()
  @Get('/members')
  allUsers() {
    return Member.find()
  }
}
