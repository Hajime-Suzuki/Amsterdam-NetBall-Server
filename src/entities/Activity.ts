import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm"
import { Team } from "./Team"
import { Member } from "./Member"
import { ActivityAttendance } from "./ActivityAttendance"

@Entity()
export class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column("varchar", { length: 255 })
  name: string

  @Column("varchar", { length: 255 })
  location: string

  @Column("varchar", { nullable: true })
  address?: string

  @Column("timestamp")
  startTime: Date

  @Column("timestamp")
  endTime: Date

  @Column("integer")
  points: number

  @ManyToMany(() => Member, member => member.activities)
  members: Member[]

  @OneToMany(() => ActivityAttendance, actAtt => actAtt.activity, {
    cascade: true
  })
  isAttended: ActivityAttendance[]
}
