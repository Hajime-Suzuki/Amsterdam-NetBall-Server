import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { Member } from './Member'

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 20 })
  roleName: 'admin' | 'member' | 'committee'

  @OneToMany(() => Member, member => member.role)
  members: Member[]
}
