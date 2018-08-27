import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany
} from 'typeorm'
import { Member } from './Member'

@Entity()
export class Position extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 20 })
  positionName: string

  @ManyToMany(() => Member, member => member.positions)
  members: Member[]
}
