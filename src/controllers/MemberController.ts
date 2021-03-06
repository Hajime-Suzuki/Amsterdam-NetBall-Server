import * as moment from 'moment'
import {
  Authorized,
  Body,
  CurrentUser,
  Get,
  JsonController,
  NotFoundError,
  Param,
  Patch,
  Post,
  Put,
  QueryParams
} from 'routing-controllers'
import { Brackets } from 'typeorm'
import { Committee } from '../entities/Committee'
import { Member } from '../entities/Member'
import { Role } from '../entities/Role'
import { Team } from '../entities/Team'
import { setMemberOrder } from '../libs/setMemberOrder'
import { Activity } from './../entities/Activity'

@JsonController()
export default class MemberController {
  @Get('/')
  top() {
    return 'Amsterdam Netball'
  }

  @Post('/signup')
  async signup(@Body() data: Member) {
    data.role = await Role.findOne({ where: { roleName: 'member' } })
    return Member.create(data).save()
  }

  @Authorized()
  @Get('/members/:id([0-9]+)')
  async getUser(@Param('id') id: number, @CurrentUser() user: Member) {
    const member = await Member.createQueryBuilder('m')
      .where('m.id = :id', { id })
      .leftJoinAndSelect('m.committees', 'c')
      .leftJoinAndSelect('m.role', 'r')
      .leftJoinAndSelect('m.team', 't')
      .leftJoinAndSelect('m.activities', 'a')
      .leftJoinAndSelect('m.positions', 'p')
      .getOne()
    return member
  }

  @Authorized()
  @Put('/members/:id([0-9]+)')
  async updateProfile(
    @Param('id') id: number,
    @Body() update,
    @CurrentUser() user: Member
  ) {
    const member = await Member.findOne(id)
    if (!member) throw new NotFoundError('Cannot find member')

    if (update.team) {
      const oldTeam = await Team.findOne(member.team.id, {
        relations: ['members']
      })

      if (oldTeam.members.length > 0) {
        oldTeam.members.splice(
          oldTeam.members.findIndex(member => id === member.id),
          1
        )
        await oldTeam.save()
      }

      const team = await Team.findOne(update.team, { relations: ['members'] })
      member.team = team
      team.members.push(member)
      await Promise.all([member.save(), team.save()])
      const m = await Member.findOne(id)
      return m
    } else {
      const updatedMember = await Member.merge(member, update).save()
      return updatedMember
    }
  }

  @Authorized()
  @Patch('/members/:memberId([0-9]+)/:activityId([0-9]+)')
  async joinActivity(
    @Param('memberId') memberId: number,
    @Param('activityId') activityId: number,
    @CurrentUser() user: Member | null
  ) {
    const member = await Member.findOne(memberId)
    const activity = await Activity.findOne(activityId)
    member.activities.push(activity)
    await member.save()
    return member
  }

  @Authorized()
  @Patch('/members/unsubscribe/:memberId([0-9]+)/:activityId([0-9]+)')
  async unsubscribeActivity(
    @Param('memberId') memberId: number,
    @Param('activityId') activityId: number,
    @CurrentUser() user: Member | null
  ) {
    const member = await Member.findOne(memberId)

    member.activities.splice(
      member.activities.findIndex(activity => activityId === activity.id),
      1
    )

    await member.save()
    return member
  }

  @Authorized()
  @Patch('/committees/join/:memberId([0-9]+)/:committeeId([0-9]+)')
  async addCommitteeToMember(
    @Param('memberId') memberId: number,
    @Param('committeeId') committeeId: number,
    @CurrentUser() user: Member
  ) {
    console.log('add memberId', memberId, 'committeeId', committeeId)
    const thisMember = await Member.createQueryBuilder('m')
      .where('m.id = :id', { id: memberId })
      .leftJoinAndSelect('m.committees', 'c')
      .leftJoinAndSelect('m.role', 'r')
      .leftJoinAndSelect('m.team', 't')
      .leftJoinAndSelect('m.activities', 'a')
      .leftJoinAndSelect('m.positions', 'p')
      .getOne()

    const thisCommittee = await Committee.findOne(committeeId)
    thisMember.committees.push(thisCommittee)
    await thisCommittee.save()
    await thisMember.save()
    return thisMember
  }

  @Authorized()
  @Patch('/committees/leave/:memberId([0-9]+)/:committeeId([0-9]+)')
  async removeCommitteeFromMember(
    @Param('memberId') memberId: number,
    @Param('committeeId') committeeId: number,
    @CurrentUser() user: Member
  ) {
    console.log('remove memberId', memberId, 'committeeId', committeeId)
    const thisMember = await Member.createQueryBuilder('m')
      .where('m.id = :id', { id: memberId })
      .leftJoinAndSelect('m.committees', 'c')
      .leftJoinAndSelect('m.role', 'r')
      .leftJoinAndSelect('m.team', 't')
      .leftJoinAndSelect('m.activities', 'a')
      .leftJoinAndSelect('m.positions', 'p')
      .getOne()

    const thisCommittee = await Committee.findOne(committeeId)
    thisMember.committees.splice(
      thisMember.committees.findIndex(
        committee => committeeId === committee.id
      ),
      1
    )
    await thisCommittee.save()
    await thisMember.save()
    return thisMember
  }

  @Authorized()
  @Get('/members')
  async allUsers(
    @QueryParams() params: any,
    @CurrentUser() user: Member | null
  ) {
    const name = params.name ? params.name : '%'
    let query = Member.createQueryBuilder('member')

    if (user.role.roleName !== 'admin') {
      query.select([
        'member.id',
        'member.firstName',
        'member.lastName',
        'member.isCurrentMember',
        'positions',
        'committees',
        'activity'
      ])
    }

    query
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
    // if (params.isCurrentMember) {
    //   query = query.andWhere('member.isCurrentMember = :isCurrentMember', {
    //     isCurrentMember: params.isCurrentMember
    //   })
    // }

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

    if (user.role.roleName === 'admin' && params.currentMemberOption) {
      const option = params.currentMemberOption

      if (params.currentMemberOption !== 'All') {
        query = query.andWhere('member.isCurrentMember = :membership', {
          membership: option === 'currentMemberOnly'
        })
      }
    } else {
      query = query.andWhere('member.isCurrentMember = :membership', {
        membership: true
      })
    }

    setMemberOrder(query, params)

    const result = await query.getMany()
    const count = result.length
    return { members: result, count }
  }

  @Get('/test')
  async test() {
    const members = await Member.find()
    const now = new Date()
    members.forEach(u => {
      const activities = u.isAttended

      const endedActivity = activities.filter(act => act.activity.endTime < now)
      if (!endedActivity.length) {
        u.attendanceRate = null
        u.activityPoints = null
        return
      }

      const totalAttended = endedActivity.filter(act => act.isAttended === true)

      u.attendanceRate = totalAttended.length / endedActivity.length

      if (!u.attendanceRate) return (u.activityPoints = 0)

      u.activityPoints = totalAttended.reduce((points, act) => {
        const diff = moment(act.activity.endTime).diff(
          moment(act.activity.startTime),
          'hours'
        )
        return (points += diff)
      }, 0)
    })

    await Member.save(members)

    return 'updated'
  }
}
