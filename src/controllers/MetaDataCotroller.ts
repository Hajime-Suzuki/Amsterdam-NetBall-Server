import { Get, JsonController } from 'routing-controllers'
import { Committee } from '../entities/Committee'
import { Position } from '../entities/Position'
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

    return {
      positions,
      comittees,
      roles,
      teams
    }
  }
}
