import {
  JsonController,
  Post,
  Param,
  Get,
  Body,
  Authorized,
  CurrentUser,
  QueryParam,
  BadRequestError
} from "routing-controllers"
import { getRepository } from "typeorm"
import { Member } from "../entities/Member"
import { Position } from "../entities/Position"

@JsonController()
export default class MemberController {
  @Post("/signup")
  signup(@Body() data: Member) {
    console.log(data)
    return Member.create(data).save()
  }

  @Authorized()
  @Get("/members/:id([0-9]+)")
  getUser(@Param("id") id: number, @CurrentUser() user: Member) {
    const member = Member.findOne(id)
    return member
  }

  // @Authorized()
  @Get("/members")
  async allUsers(
    @QueryParam("id") id: string,
    @QueryParam("name") name: string,
    @QueryParam("email") email: string,
    @QueryParam("city") city: string,
    @QueryParam("isCurrentMember") isCurrentMember: string,
    @QueryParam("dateOfBirth") dateOfBirth: string,
    @QueryParam("startDate") startDate: string,
    @QueryParam("endDate") endDate: string,
    @QueryParam("positions") positions: string,
    @QueryParam("team") team: string,
    @QueryParam("role") role: string,
    @CurrentUser() user: Member | null
  ) {
    let query = Member.createQueryBuilder("member").leftJoinAndSelect(
      "member.positions",
      "positions"
    )

    if (name) {
      query = query.where(
        "member.firstName LIKE :name OR member.lastName LIKE :name",
        { name: `%${name}%` }
      )
    }
    if (email) {
      query = query.andWhere("member.email LIKE :email", {
        email: `%${email}%`
      })
    }
    if (city) {
      query = query.andWhere("member.city LIKE :city", { city: `%${city}%` })
    }
    if (isCurrentMember) {
      query = query.andWhere("member.isCurrentMember = :isCurrentMember", {
        isCurrentMember
      })
    }
    if (dateOfBirth) {
      const timestamp = new Date(dateOfBirth)
      query = query.andWhere("member.dateOfBirth = :dateOfBirth", {
        dateOfBirth: timestamp
      })
    }
    if (startDate) {
      const timestamp = new Date(startDate)
      query = query.andWhere("member.startDate = :startDate", {
        startDate: timestamp
      })
    }
    if (endDate) {
      const timestamp = new Date(endDate)
      query = query.andWhere("member.endDate = :endDate", {
        endDate: timestamp
      })
    }

    if (positions) {
      console.log(positions)
      const allPositions = positions.split(",")
      console.log("positions", allPositions)
      query = query.andWhere("positions.id = :position", {
        position: allPositions[0]
      })
      console.log(query)
    }
    if (team) {
      query = query.where("member.team.id = :team", { team: team })
    }
    if (role) {
      query = query.where("member.role.id = :role", { role: role })
    }
    return query.getMany()
  }
}
