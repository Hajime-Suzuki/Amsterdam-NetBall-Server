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
  HttpCode,
  BodyParam
} from 'routing-controllers'
import { Member } from '../../entities/Member'
import { Activity } from '../../entities/Activity'
import { ActivityAttendance } from '../../entities/ActivityAttendance'

@JsonController('/admin/activity')
export default class ActivityController {
  @Get('/')
  getActivities() {
    return Activity.find()
  }

  @Get('/members')
  getActivitiesAndMembers() {
    return (
      Activity.createQueryBuilder('a')
        // .select(['a', 'm.id','m.firstName', ])
        .leftJoinAndSelect('a.members', 'm')
        .leftJoinAndSelect('m.isAttended', 'att')
        .orderBy('a.startTime')
        .getMany()
    )
  }

  @Authorized()
  @Patch('/attendance/:id([0-9]+)')
  async changeAttendance(@Param('id') id: number) {
    const attendance = await ActivityAttendance.findOne(id)
    const member = await Member.findOne(attendance.memberId)

    //update points and isAttended
    if (!attendance.isAttended) {
      member.activityPoints += attendance.activity.points
    } else {
      member.activityPoints -= attendance.activity.points
    }
    attendance.isAttended = !attendance.isAttended

    const [updatedAtt, _] = await Promise.all([
      attendance.save(),
      member.save()
    ])

    return updatedAtt
  }

  @Authorized()
  @Post('/')
  @HttpCode(201)
  createActivity(@CurrentUser() member: Member, @Body() data: Activity) {
    try {
      member.checkIfAdmin()

      data.endTime = new Date(data.endTime)
      data.startTime = new Date(data.startTime)

      return Activity.create(data).save()
    } catch (e) {
      console.log(e)
    }
  }

  @Authorized()
  @Patch('/:id')
  async editActivity(
    @CurrentUser() member: Member,
    @Param('id') id: number,
    @Body() data: Activity
  ) {
    member.checkIfAdmin()
    const activity = await Activity.findOne({ id })
    if (!activity) throw new NotFoundError('activity not found')

    await Activity.update(id, data)
    return Activity.findOne({ id })
  }

  @Authorized()
  @Delete('/:id')
  async deleteActivity(@CurrentUser() member: Member, @Param('id') id: number) {
    member.checkIfAdmin()
    const activity = await Activity.findOne({ id })
    if (!activity) throw new NotFoundError('activity not found')
    return activity.remove()
  }
}
