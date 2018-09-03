import { Member } from '../entities/Member'
import * as moment from 'moment'
export const updateAttendanceRate = async () => {
  const members = await Member.find()
  const now = new Date()
  members.forEach(u => {
    const activities = u.isAttended

    const endedActivity = activities.filter(act => act.activity.endTime < now)
    if (!endedActivity.length) {
      u.attendanceRate = null
      u.activityPoints = null
      return
    }

    const totalAttended = endedActivity.filter(act => act.isAttended === true)

    u.attendanceRate = totalAttended.length / endedActivity.length

    if (!u.attendanceRate) return (u.activityPoints = 0)

    u.activityPoints = totalAttended.reduce((points, act) => {
      const diff = moment(act.activity.endTime).diff(
        moment(act.activity.startTime),
        'hours'
      )
      return (points += diff)
    }, 0)
  })

  await Member.save(members)

  console.log('Updated Attendance Rate')
}
