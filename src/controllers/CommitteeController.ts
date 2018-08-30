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
    const committee = await Committee.findOne(id)
    return committee
  }

  // @Authorized()
  @Post('/committees/:id([0-9]+)')
  async addMessage(
    @Body() message: Message,
    @Param('id') id: number,
    @CurrentUser() user: Member
    ) {
    console.log('message', message)
    const thisCommittee = await Committee.findOne( id )
    if (!thisCommittee) throw new NotFoundError(`Committee does not exist`)
    message.committee = thisCommittee

    return Message.create(message).save()
  }



  // @Authorized()
  // @Post('/tickets/:id')
  // @HttpCode(201)
  // async createTicket(
  //   @Body() ticket: Ticket,
  //   @Param('id') eventId,
  //   @CurrentUser() user: User
  // ) {
  //   const thisEvent = await Event.findOne( eventId )
  //   if (!thisEvent) throw new NotFoundError(`Event does not exist`)

  //   ticket.event = thisEvent
  //   ticket.user = user
  //   ticket.price = parseFloat(ticket.price.toString())
  //   return ticket.save()
  // }

}
