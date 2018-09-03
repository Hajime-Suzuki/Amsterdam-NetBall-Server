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
import { Activity } from '../entities/Activity'

@JsonController('/populate')
export default class PopulateController {
  @Get('/')
  async populate() {
    // const startDate = faker.date.between('2017-01-01', new Date())

    // const endDate = faker.date.between(startDate, '2019-01-01')

    const users = await Member.find()
    users.forEach(u => {
      const startDate = faker.date.between('2018-01-01', new Date())
      const endDate = faker.date.between(startDate, '2019-01-01')
      u.endDate = endDate
      u.startDate = startDate
    })
    await Member.save(users)

    // const activities = await Activity.find()

    // activities.forEach(u => {
    //   const startDate = faker.date.recent(3)
    //   const endDate = faker.date.between(startDate, '2018-09-01')
    //   u.startTime = startDate
    //   u.endTime = endDate
    // })
    // await Activity.save(activities)

    // let role = await Role.findOne({ where: { name: 'member' } })
    // if (!role) {
    //   const r1 = Role.create({
    //     roleName: 'member'
    //   })

    //   const r2 = Role.create({
    //     roleName: 'admin'
    //   })

    //   const r3 = Role.create({
    //     roleName: 'committee'
    //   })
    //   await Role.save([r1, r2, r3])
    // }

    // const members = Array(30)
    //   .fill('')
    //   .map(() => {
    //     return Member.create({
    //       firstName: faker.name.firstName(),
    //       lastName: faker.name.lastName(),
    //       streetAddress: faker.address.streetAddress(),
    //       postalCode: faker.address.zipCode('######'),
    //       city: faker.address.city(),
    //       dateOfBirth: faker.date.between('1980-01-01', '2000-01-01'),
    //       isCurrentMember: false,
    //       email: faker.internet.email(),
    //       password: 'aaaaaa',
    //       startDate,
    //       endDate
    //       // role
    //     })
    //   })

    // await Member.save(members)

    // const teams = Array(10)
    //   .fill('')
    //   .map(() => {
    //     return Team.create({
    //       name: faker.commerce.department()
    //     })
    //   })

    // await Team.save(teams)

    // const activities = Array(10)
    //   .fill('')
    //   .map(() => {
    //     return Activity.create({
    //       name: faker.commerce.productMaterial(),
    //       location: faker.address.city(),
    //       address: faker.address.streetAddress(),
    //       startTime: faker.date.between('2018-09-01', '2018-09-05'),
    //       endTime: faker.date.between('2018-09-05', '2018-09-08'),
    //       points: faker.random.number({ min: 1, max: 4 })
    //     })
    //   })

    // await Activity.save(activities)

    // const members = await Member.find()
    // const activities = await Activity.find()
    // const positions = await Position.find()
    // const updatedMembers = members.forEach(async m => {
    //   m.activities.push(activities[faker.random.number({ min: 1, max: 10 })]),
    //     m.positions.push(positions[faker.random.number({ min: 1, max: 7 })])

    //   await m.save()
    // })

    // Member.save(updatedMembers)

    // const member = await .save()

    // const position = await Position.create({
    //   positionName: 'keeper',
    //   members: [member]
    // }).save()
    // const anotherPosition = await Position.findOne({ id: 1 })

    // const league = await League.create({
    //   LeagueName: 'Super League' + Math.floor(Math.random() * 1000)
    // }).save()

    // const team = await Team.create({
    //   name: 'Nice team' + Math.floor(Math.random() * 1000),
    //   members: [member],
    //   league
    // }).save()

    // member.team = team
    // member.positions = [position, anotherPosition]

    // const outputMember = await member.save()
    // return outputMember
    return 'done'
  }
}
