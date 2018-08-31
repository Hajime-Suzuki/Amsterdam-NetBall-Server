import { Member } from '../../entities/Member'
export const updateAttendanceRate = async () => {
  const members = await Member.find()
  const now = new Date()
  members.forEach(u => {
    const activities = u.isAttended

    const endedActivity = activities.filter(act => act.activity.endTime < now)
    if (!endedActivity.length) return (u.attendanceRate = null)

    const totalAttended = endedActivity.filter(act => act.isAttended === true)

    u.attendanceRate = totalAttended.length / endedActivity.length
  })
  await Member.save(members)
  console.log('Updated Attendance Rate')
}
