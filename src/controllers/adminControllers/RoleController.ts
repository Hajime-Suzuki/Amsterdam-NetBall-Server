import {
  JsonController,
  Post,
  Param,
  Get,
  Body,
  Authorized,
  Patch,
  NotFoundError,
  Delete,
  CurrentUser,
  HttpCode
} from 'routing-controllers'
import { Member } from '../../entities/Member'
import { Activity } from '../../entities/Activity'
import { Role } from '../../entities/Role'

@JsonController('/admin/role')
export default class RoleController {
  // @Get('/')
  // getActivities() {
  //   return Activity.find()
  // }
  // @Authorized()
  // @Post('/')
  // @HttpCode(201)
  // createRole(@CurrentUser() member: Member, @Body() data: Role) {
  //   member.checkIfAdmin()
  //   return Role.create(data).save()
  // }
  // @Authorized()
  // @Patch('/:id')
  // async editActivity(
  //   @CurrentUser() member: Member,
  //   @Param('id') id: number,
  //   @Body() data: Activity
  // ) {
  //   member.checkIfAdmin()
  //   const activity = await Activity.findOne({ id })
  //   if (!activity) throw new NotFoundError('activity not found')
  //   await Activity.update(id, data)
  //   return Activity.findOne({ id })
  // }
  // @Authorized()
  // @Delete('/:id')
  // async deleteActivity(@CurrentUser() member: Member, @Param('id') id: number) {
  //   member.checkIfAdmin()
  //   const activity = await Activity.findOne({ id })
  //   if (!activity) throw new NotFoundError('activity not found')
  //   return activity.remove()
  // }
}
