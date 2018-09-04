import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  OneToOne,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  AfterLoad
} from 'typeorm'
import { Team } from './Team'
import { Member } from './Member'
import { Activity } from './Activity'

@Entity()
export class ActivityAttendance extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('boolean', { default: false })
  isAttended: boolean

  @ManyToOne(() => Member, member => member.isAttended)
  member: Member

  @ManyToOne(() => Activity, activity => activity.isAttended, { eager: true })
  activity: Activity

  // @Column({ nullable: true })
  // activityId: number
}
