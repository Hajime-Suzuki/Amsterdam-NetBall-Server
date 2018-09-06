import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn
} from 'typeorm'
import { Committee } from './Committee'
import { Member } from './Member'

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  body: string

  @ManyToOne(() => Committee, committee => committee.messages, { onDelete: 'CASCADE' })
  committee: Committee

  @ManyToOne(() => Member, member => member.messages, { eager: true })
  member: Member

  @CreateDateColumn()
  created_at: Date

}