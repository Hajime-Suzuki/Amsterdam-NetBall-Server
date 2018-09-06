import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne
} from "typeorm"
import { Member } from "./Member"
import { League } from "./League"

@Entity()
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column("varchar", { length: 255 })
  name: string

  @OneToMany(() => Member, member => member.team)
  members: Member[]

  @ManyToOne(() => League, league => league.teams)
  league: League
}
