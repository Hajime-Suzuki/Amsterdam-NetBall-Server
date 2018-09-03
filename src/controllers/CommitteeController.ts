import {
  JsonController,
  Post,
  Param,
  Get,
  Put,
  Delete,
  Body,
  Authorized,
  CurrentUser,
  QueryParams,
  BadRequestError,
  NotFoundError,
  ForbiddenError
} from 'routing-controllers'
import { Committee } from '../entities/Committee'
import { Member } from '../entities/Member'
import { Message } from '../entities/Message'

@JsonController()
export default class CommitteeController {

  // @Post('/committees')
  // addCommittee(@Body() data: Committee) {
  //   return Committee.create(data).save()
  // }

  // @Authorized()
  @Get('/committees/:id([0-9]+)')
  async getCommittee(
    @Param('id') id: number,
    @CurrentUser() user: Member
    ) {
    let committee = await Committee.createQueryBuilder("c")
       .leftJoinAndSelect("c.messages", "m")
       .leftJoinAndSelect("m.member", "member")
       .getOne()
    return committee
  }

  // @Authorized()
  @Post('/committees/:id([0-9]+)')
  async createMessage(
    @Body() message: Message,
    @Param('id') id: number,
    @CurrentUser() user: Member
    ) {
    const thisCommittee = await Committee.findOne( id )
    if (!thisCommittee) throw new NotFoundError(`Committee does not exist`)
    message.committee = thisCommittee

    return Message.create(message).save()
  }

  // @Authorized()
  @Put('/committees/:id([0-9]+)')
  async updateMessage(
    @Body() update: Message,
    @Param('id') id: number,
    @CurrentUser() user: Member
    ) {
    const message = await Message.findOne(id)

    if (!message) throw new NotFoundError('Cannot find ticket')
    if (message.member.id !== user.id) throw new ForbiddenError('You can only edit your own content!')

    Object.keys(message).forEach( (key)=>{
      if (update[key]) {
        message[key] = update[key]
      }
    })
    return message.save()
  }

  // @Authorized()
  @Delete('/committees/:id([0-9]+)')
  deleteMessage(
    @Param("id") id: number
  ) {
     return Message.delete(id);
  }


}
