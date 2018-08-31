import {
  JsonController,
  Post,
  Param,
  Get,
  Body,
  Authorized,
  CurrentUser,
  QueryParams,
  BadRequestError
} from 'routing-controllers'
import { getRepository, Brackets } from 'typeorm'
import { Member } from '../entities/Member'
import { Position } from '../entities/Position'

@JsonController()
export default class MemberController {
  @Post('/signup')
  signup(@Body() data: Member) {
    console.log(data)
    return Member.create(data).save()
  }

  @Authorized()
  @Get('/members/:id([0-9]+)')
  getUser(@Param('id') id: number, @CurrentUser() user: Member) {
    const member = Member.findOne(id)
    return member
  }

  // @Authorized()
  @Get('/members')
  async allUsers(
    @QueryParams() params: any,
    @CurrentUser() user: Member | null
  ) {
    const name = params.name ? params.name : '%'
    let query = Member.createQueryBuilder('member')
      .leftJoinAndSelect('member.positions', 'positions')
      .leftJoinAndSelect('member.committees', 'committees')
      .leftJoinAndSelect('member.team', 'team')
      .leftJoinAndSelect('member.activities', 'activity')
      .where(
        new Brackets(qb => {
          qb.where('member.firstName ILIKE :name', {
            name: `%${name}%`
          }).orWhere('member.lastName ILIKE :name', { name: `%${name}%` })
        })
      )

    if (params.email) {
      query = query.andWhere('member.email ILIKE :email', {
        email: `%${params.email}%`
      })
    }
    if (params.city) {
      query = query.andWhere('member.city ILIKE :city', {
        city: `%${params.city}%`
      })
    }
    if (params.isCurrentMember) {
      query = query.andWhere('member.isCurrentMember = :isCurrentMember', {
        isCurrentMember: params.isCurrentMember
      })
    }
    if (params.dateOfBirth) {
      const timestamp = new Date(params.dateOfBirth)
      query = query.andWhere('member.dateOfBirth = :dateOfBirth', {
        dateOfBirth: timestamp
      })
    }
    if (params.startDate) {
      const timestamp = new Date(params.startDate)
      query = query.andWhere('member.startDate = :startDate', {
        startDate: timestamp
      })
    }
    if (params.endDate) {
      const timestamp = new Date(params.endDate)
      query = query.andWhere('member.endDate = :endDate', {
        endDate: timestamp
      })
    }
    if (params.positions) {
      // const allPositions = params.positions.split(',')
      query = query.andWhere('positions.id IN (:...names)', {
        names: params.positions.split(',')
      })
    }
    if (params.committees) {
      const allCommittees = params.committees.split(',')
      query = query.andWhere('committees.id IN (:...ids)', {
        ids: allCommittees
      })
    }
    if (params.teams) {
      query = query.andWhere('team.id IN (:...teams)', {
        teams: params.teams.split(',')
      })
    }
    if (params.role) {
      query = query.andWhere('member.role.id = :role', { role: params.role })
    }

    if (params.currentMember) {
      query = query.andWhere(
        'member.endDate > :date AND member.isCurrentMember = :membership',
        { date: new Date(), membership: true }
      )
    }

    const result = await query.getMany()
    const count = result.length

    return { members: result, count }
  }

  @Get('/test')
  async test() {
    const user = await Member.findOne(1)
    // user.
    return user
  }
}
