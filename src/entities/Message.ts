import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { Committee } from './Committee'
import { Member } from './Member'

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  body: string

  @ManyToOne(() => Committee, committee => committee.messages)
  committee: Committee

  @ManyToOne(() => Member, member => member.messages)
  member: Member

}