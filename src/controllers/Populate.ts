import {
  JsonController,
  Post,
  Param,
  Get,
  Body,
  Authorized
} from 'routing-controllers'
import { Member } from '../entities/Member'
import * as faker from 'faker'

@JsonController('/populate')
export default class PopulateController {
  @Get('/')
  populate() {
    // const member = Member.create({
    //   name: faker.name.
    // })
    return 'ashiotenaisehotn'
  }
}
