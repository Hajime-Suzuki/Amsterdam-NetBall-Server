import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm'
import { Committee } from './Committee'

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  body: string

  @ManyToOne(() => Committee, committee => committee.messages)
  committee: Committee

}