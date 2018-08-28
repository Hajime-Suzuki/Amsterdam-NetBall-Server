import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany
} from 'typeorm'
import { Team } from './Team'
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
  points: number

  @ManyToMany(() => Member, member => member.activities)
  teams: Team[]

  @ManyToMany(() => Member, member => member.activities)
  members: Member[]
}
