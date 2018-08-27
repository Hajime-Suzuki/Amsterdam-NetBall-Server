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
  id?: number

  @IsString()
  @Column('varchar', { length: 100 })
  firstName: string

  @IsString()
  @Column('varchar', { length: 100 })
  lastName: string

  @IsString()
  @Column('varchar', { length: 255, nullable: true })
  streetAddress: string

  @IsString()
  @Column('char', { length: 6, nullable: true  })
  postalCode: string

  @IsString()
  @Column('varchar', { length: 50, nullable: true })
  city: string

  // @IsDate()
  @Column('date', { nullable: true })
  dateOfBirth: Date

  @IsBoolean()
  @Column('boolean', { nullable: true })
  isCurrentMember: boolean

  @IsEmail()
  @Column('varchar', { length: 255 })
  email: string

  @IsString()
  @Column('text')
  password: string

  // @IsDate()
  @Column('date', { nullable: true })
  startDate: Date

  // @IsDate()
  @Column('date', { nullable: true })
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

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }
}
