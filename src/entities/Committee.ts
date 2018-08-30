import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from "typeorm"
import { IsString } from "class-validator"
import { Message } from './Message'
import { Member } from './Member'

@Entity()
export class Committee extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column("varchar", { length: 100 })
  name: string

  @IsString()
  @Column("varchar", { nullable: true })
  description: string

  @OneToMany(() => Message, message => message.committee, { eager: true })
  messages: Message[]

  @ManyToMany(() => Member, member => member.positions)
  members: Member[]

}