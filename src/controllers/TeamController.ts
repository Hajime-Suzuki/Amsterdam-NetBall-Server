import { Team } from "./../entities/Team"
import { JsonController, Get, Authorized } from "routing-controllers"

@JsonController()
export default class TeamController {
  @Authorized()
  @Get("/teams")
  allTeams() {
    return Team.find()
  }
}
