import { Activity } from "./../entities/Activity"
import { JsonController, Get, Authorized } from "routing-controllers"

@JsonController()
export default class MemberActivityController {
  @Authorized()
  @Get("/activities")
  allActivities() {
    return Activity.find()
  }
}
