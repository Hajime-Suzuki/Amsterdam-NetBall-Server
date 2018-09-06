import * as moment from 'moment'
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { ActivityAttendance } from './ActivityAttendance'
import { Member } from './Member'

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
