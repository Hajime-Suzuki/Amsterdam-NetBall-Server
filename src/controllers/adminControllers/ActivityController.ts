import {
  JsonController,
  Post,
  Param,
  Get,
  Body,
  Authorized,
  Patch,
  NotFoundError,
  Delete
} from 'routing-controllers'
import { Member } from '../../entities/Member'
import { Activity } from '../../entities/Activity'

@JsonController('/admin/activity')
export default class ActivityController {
  // @Authorized()
  @Get('/')
  getActivities() {
    return Activity.find()
  }

  @Post('/')
  createActivity(@Body() data: Activity) {
    return Activity.create(data).save()
  }

  @Patch('/:id')
  async editActivity(@Param('id') id: number, @Body() data: Activity) {
    const activity = await Activity.findOne({ id })
    if (!activity) throw new NotFoundError('activity not found')

    await Activity.update(id, data)
    return Activity.findOne({ id })
  }

  @Delete('/:id')
  async deleteActivity(@Param('id') id: number, @Body() data: Activity) {
    const activity = await Activity.findOne({ id })
    if (!activity) throw new NotFoundError('activity not found')
    return activity.remove()
  }
}
