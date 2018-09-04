import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  BeforeInsert
} from 'typeorm'
import { Team } from './Team'
import { Member } from './Member'
import { ActivityAttendance } from './ActivityAttendance'
import * as moment from 'moment'

@Entity()
export class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 255 })
  name: string

  @Column('varchar', { length: 255 })
  location: string

  @Column('varchar', { nullable: true })
  address?: string

  @Column('timestamp')
  startTime: Date

  @Column('timestamp')
  endTime: Date

  @Column('integer')
  points?: number

  @Column('text', { nullable: true })
  description: string

  @ManyToMany(() => Member, member => member.activities)
  members: Member[]

  @OneToMany(() => ActivityAttendance, actAtt => actAtt.activity, {
    cascade: true
  })
  isAttended: ActivityAttendance[]

  @BeforeInsert()
  async setPoints() {
    this.points = moment(this.endTime).diff(moment(this.startTime), 'hours')
  }
}
