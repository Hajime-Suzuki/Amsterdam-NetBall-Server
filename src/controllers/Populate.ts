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
import { Team } from '../entities/Team'
import { League } from '../entities/League'
import { Position } from '../entities/Position'
import { Role } from '../entities/Role'

@JsonController('/populate')
export default class PopulateController {
  @Get('/')
  async populate() {
    const startDate = faker.date.between('2017-01-01', new Date())

    const endDate = faker.date.between(startDate, '2019-01-01')

    let role = await Role.findOne({ where: { name: 'member' } })
    if (!role) {
      const r1 = Role.create({
        roleName: 'member'
      })

      const r2 = Role.create({
        roleName: 'admin'
      })

      const r3 = Role.create({
        roleName: 'committee'
      })

      await Role.save([r1, r2, r3])
    }

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
      endDate,
      role
    }).save()

    const position = await Position.create({
      positionName: 'keeper',
      members: [member]
    }).save()
    const anotherPosition = await Position.findOne({ id: 1 })

    const league = await League.create({
      LeagueName: 'Super League' + Math.floor(Math.random() * 1000)
    }).save()

    const team = await Team.create({
      name: 'Nice team' + Math.floor(Math.random() * 1000),
      members: [member],
      league
    }).save()

    member.team = team
    member.positions = [position, anotherPosition]

    const outputMember = await member.save()
    return outputMember
  }
}
