import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  ManyToMany,
  JoinTable,
  ManyToOne
} from 'typeorm'

import * as bcrypt from 'bcrypt'
import { Position } from './Position'
import { Role } from './Role'
import { Team } from './Team'
import { IsEmail, IsString, IsDate, IsBoolean } from 'class-validator'

@Entity()
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @IsString()
  @Column('varchar', { length: 100 })
  firstName: string

  @IsString()
  @Column('varchar', { length: 100 })
  lastName: string

  @IsString()
  @Column('varchar', { length: 255 })
  streetAddress: string

  @IsString()
  @Column('char', { length: 6 })
  postalCode: string

  @IsString()
  @Column('varchar', { length: 50 })
  city: string

  @IsDate()
  @Column('date')
  dateOfBirth: Date

  @IsBoolean()
  @Column('boolean')
  isCurrentMember: boolean

  @IsEmail()
  @Column('varchar', { length: 255 })
  email: string

  @IsString()
  @Column('text')
  password: string

  @IsDate()
  @Column('date')
  startDate: Date

  @IsDate()
  @Column('date')
  endDate: Date

  @ManyToMany(() => Position, position => position.members)
  @JoinTable()
  positions: Position[]

  @ManyToOne(() => Role, role => role.members)
  role: Role

  @ManyToOne(() => Team, team => team.members)
  team: Team

  @BeforeInsert()
  async setPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
