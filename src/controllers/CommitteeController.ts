import {
  JsonController,
  Post,
  Param,
  Get,
  Body,
  Authorized,
  CurrentUser,
  QueryParams,
  BadRequestError,
  NotFoundError
} from 'routing-controllers'
import { Committee } from '../entities/Committee'
import { Member } from '../entities/Member'
import { Message } from '../entities/Message'

@JsonController()
export default class CommitteeController {

  @Post('/committees')
  addCommittee(@Body() data: Committee) {
    return Committee.create(data).save()
  }

  // @Authorized()
  @Get('/committees/:id([0-9]+)')
  async getCommittee(
    @Param('id') id: number,
    @CurrentUser() user: Member
    ) {
    const committee = await Committee.findOne(id)
    return committee
  }

  // @Authorized()
  @Post('/committees/:id([0-9]+)')
  async addMessage(
    @Body() partial: Message,
    @Param('id') committeeId: number,
    @CurrentUser() user: Member
    ) {
    const thisCommittee = await Committee.findOne( committeeId )
    if (!thisCommittee) throw new NotFoundError(`Committee does not exist`)
    partial.committee = thisCommittee

    return Message.create(partial).save()
  }

}
