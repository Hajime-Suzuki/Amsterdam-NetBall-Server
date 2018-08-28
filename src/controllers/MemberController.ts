import {
  JsonController,
  Post,
  Param,
  Get,
  Body,
  Authorized,
  CurrentUser
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
  getUser(
    @Param('id') id: number,
    @CurrentUser() user: Member
  ) {
    const member = Member.findOne(id)
    return member
  }

  @Authorized()
  @Get('/members')
  allUsers(
    @CurrentUser() user: Member
  ) {
    return Member.find()
  }

}
