import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from "typeorm"
import { IsString } from "class-validator"
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

  @ManyToMany(() => Member, member => member.positions)
  members: Member[]

}