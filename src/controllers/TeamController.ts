import { Team } from "./../entities/Team"
import { JsonController, Get, Authorized } from "routing-controllers"

@JsonController()
export default class TeamController {
  @Authorized()
  @Get("/teams")
  allActivities() {
    return Team.find()
  }
}
