import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm'
import { Team } from './Team'

@Entity()
export class League extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 255 })
  LeagueName: string

  @OneToMany(() => Team, team => team.league)
  teams: Team[]
}
