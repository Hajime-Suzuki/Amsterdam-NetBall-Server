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
  async populate() {
    const startDate = faker.date.between('2017-01-01', new Date())

    const endDate = faker.date.between(startDate, '2019-01-01')

    const member = await Member.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      streetAddress: faker.address.streetAddress(),
      postalCode: faker.address.zipCode('######'),
      city: faker.address.city(),
      dateOfBirth: faker.date.between('1980-01-01', '2000-01-01'),
      isCurrentMember: false,
      email: faker.internet.email(),
      password: 'aaaaaa',
      startDate,
      endDate
    }).save()

    return member
  }
}
