import { IsString } from 'class-validator'
import {
  JsonController,
  Post,
  Body,
  BadRequestError,
  Get
} from 'routing-controllers'
import { sign } from '../jwt'
import { Member } from '../entities/Member'
import { Position } from '../entities/Position'
import { Committee } from '../entities/Committee'
import { Role } from '../entities/Role'
import { Team } from '../entities/Team'

@JsonController('/metadata')
export default class MetaDataController {
  @Get('/')
  async getMetaData() {
    const [positions, comittees, roles, teams] = await Promise.all([
      Position.find(),
      Committee.find(),
      Role.find(),
      Team.find()
    ])

    const output = {
      positions,
      comittees,
      roles,
      teams
    }

    return output

    // const positions = await Position.find()
    // const comittee = await Committee.find()
    // const roles = await Role.find()
    // const teams = await Team.find()
  }
}
