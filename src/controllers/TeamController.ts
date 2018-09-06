import { Team } from "./../entities/Team"
import { JsonController, Get, Authorized } from "routing-controllers"

@JsonController()
export default class TeamController {
  @Authorized()
  @Get("/teams")
  async allTeams() {
    const teams = await Team.find({ relations: ["members"] })
    return teams
  }
}
