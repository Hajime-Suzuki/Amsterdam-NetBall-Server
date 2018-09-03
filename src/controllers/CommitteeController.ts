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
    // let committee = await Committee.createQueryBuilder("c")
    //    .leftJoinAndSelect("c.messages", "m")
    //    .leftJoinAndSelect("m.member", "member")
    //    .getOne()

    const committee = await Committee.findOne(id)

    return committee
  }

  // @Authorized()
  @Post('/committees/:id([0-9]+)')
  async createMessage(
    @Body() message: Message,
    @Param('id') id: number,
    @CurrentUser() user: Member

    ) {
    console.log('message', message)

    const thisCommittee = await Committee.findOne( id )

    if (!thisCommittee) throw new NotFoundError(`Committee does not exist`)
    message.committee = thisCommittee
    message.member = user

    return Message.create(message).save()
  }

  @Authorized()
  @Put('/messages/:id([0-9]+)/:messageId([0-9]+)')
  async updateMessage(
    @Body() update: Message,
    @Param('id') id: number,
    @Param('messageId') messageId: number,
    @CurrentUser() user: Member

    ) {
    console.log('update', update)
    const thisMessage = await Message.findOne(messageId)

    if (!thisMessage) throw new NotFoundError('Cannot find ticket')

    console.log('update', update)
    Object.keys(thisMessage).forEach( (key)=>{
      if (update[key] && key!=='id') {
        thisMessage[key] = update[key]

      }
    })
    return thisMessage.save()
  }

  // @Authorized()

  @Delete('/committees/:id([0-9]+)/:messageId([0-9]+)')
  async deleteMessage(
    @Param("id") id: number,
    @Param("messageId") messageId: number
  ) {
     const message = await Message.findOne(messageId)
     return Message.delete(messageId);
  }

}
