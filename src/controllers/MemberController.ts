import {
  JsonController,
  Post,
  Param,
  Get,
  Body,
  Authorized,
  CurrentUser
} from 'routing-controllers'
import { getRepository } from 'typeorm'
import { Member } from '../entities/Member'

@JsonController()
export default class MemberController {
  @Post('/signup')
  signup(@Body() data: Member) {
    return Member.create(data).save()
  }

  @Authorized()
  @Get('/members/:id([0-9]+)')
  getUser(
    @Param('id') id: number,
    @CurrentUser() user: Member
  ) {
    const member = Member.findOne(id)
    return member
  }

/*

Simple example of QueryBuilder:

const firstUser = await connection
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: 1 })
    .getOne();

*/

  // @Authorized()
  @Get('/members')
  async allUsers(
    // @Body() filterParams,
    filterParams: string,
    @CurrentUser() user: Member | null,
  ) {
    // const qb = await Member.createQueryBuilder("member");
    // const query = await Member.createQueryBuilder("member")

    // const query = await qb
    // .select("member")
    // .from(Member, "member")
    // .where("member.firstName = :firstName", { firstName: filterParams })
    // .getMany()

// .createQueryBuilder("user")
//     .select("SUM(user.photosCount)", "sum")

    // let query = Member.createQueryBuilder().select("member").from(Member, "member")
    // query = query.where("user.firstName LIKE %:firstName%", { firstName: filterParams.filterParams })

    // if (filterParams.firstName && filterParams.firstName !== '') {
    //   query = query.where("user.firstName LIKE %:firstName%", { firstName: filterParams.firstName })
    // }
    // if (filterParams.lastName && filterParams.lastName !== '') {
    //   query = query.where("user.lastName LIKE %:lastName%", { lastName: filterParams.lastName })
    // }
    // if (filterParams.email && filterParams.email !== '') {
    //   query = query.where("user.email LIKE %:email%", { email: filterParams.email })
    // }
    // if (filterParams.city && filterParams.city !== '') {
    //   query = query.where("user.city LIKE %:city%", { city: filterParams.city })
    // }
    // if (filterParams.isCurrentMember && filterParams.isCurrentMember !== null) {
    //   query = query.where("user.isCurrentMember = :isCurrentMember", { isCurrentMember: filterParams.isCurrentMember })
    // }
    // if (filterParams.dateOfBirth && filterParams.dateOfBirth !== null) {
    //   query = query.where("user.dateOfBirth = :dateOfBirth", { dateOfBirth: filterParams.dateOfBirth })
    // }
    // if (filterParams.startDate && filterParams.startDate !== null) {
    //   query = query.where("user.startDate = :startDate", { startDate: filterParams.startDate })
    // }
    // if (filterParams.endDate && filterParams.endDate !== null) {
    //   query = query.where("user.endDate = :endDate", { endDate: filterParams.endDate })
    // }
    // if (filterParams.positions && filterParams.positions !== null) {
    //   query = query.where("user.positions = :positions", { positions: filterParams.positions })
    // }
    // if (filterParams.team && filterParams.team !== null) {
    //   query = query.where("user.team = :team", { team: filterParams.team })
    // }
    // if (filterParams.role && filterParams.role !== null) {
    //   query = query.where("user.role = :role", { role: filterParams.role })
    // }


    // return query
    return Member.find()
  }

}

/*
{
  role: Role // 'member' | 'committee' | 'admin'
  firstName: string,
  lastName: string,
  email: string
  city: string
  dateOfBirth: Date
  isCurrentMember: boolean
  startDate: Date
  endDate: Date
  team: Team
  positions: Position[]
}
*/