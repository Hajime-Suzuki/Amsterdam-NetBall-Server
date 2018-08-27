import { MigrationInterface, QueryRunner } from 'typeorm'

export class MigrationOne1535399246560 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `
      DROP TABLE IF EXISTS leagues CASCADE;
          DROP TABLE IF EXISTS members CASCADE;
          DROP TABLE IF EXISTS roles CASCADE;
          DROP TABLE IF EXISTS members_positions_positions CASCADE;
          DROP TABLE IF EXISTS teams CASCADE;
          DROP TABLE IF EXISTS positions CASCADE;

   
      CREATE TABLE public.leagues (id serial NOT NULL,league_name varchar(255) NOT NULL,CONSTRAINT "PK_2275e1e3e32e9223298c3a0b514" PRIMARY KEY(id));
      
      CREATE TABLE public.teams (
        id serial NOT NULL,
        "name" varchar(255) NOT NULL,
        league_id int4 NULL,
        CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY (id),
        CONSTRAINT "FK_93efc202a8d7f778f7c6d069820" FOREIGN KEY (league_id) REFERENCES leagues(id)
    ); 

      CREATE TABLE public.positions (
        id serial NOT NULL,
        position_name varchar(20) NOT NULL,
        CONSTRAINT "PK_17e4e62ccd5749b289ae3fae6f3" PRIMARY KEY (id)
      );


      CREATE TABLE public.roles (
        id serial NOT NULL,
        role_name varchar(20) NOT NULL,
        CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id)
      );

   

     CREATE TABLE public.members (
        id serial NOT NULL,
        first_name varchar(100) NOT NULL,
        last_name varchar(100) NOT NULL,
        street_address varchar(255) NOT NULL,
        postal_code bpchar(6) NOT NULL,
        city varchar(50) NOT NULL,
        date_of_birth date NOT NULL,
        is_current_member bool NOT NULL,
        email varchar(255) NOT NULL,
        "password" text NOT NULL,
        start_date date NOT NULL,
        end_date date NOT NULL,
        role_id int4 NULL,
        team_id int4 NULL,
        CONSTRAINT "PK_28b53062261b996d9c99fa12404" PRIMARY KEY (id),
        CONSTRAINT "FK_274c5ebb3c595f5a56f1f8fba9a" FOREIGN KEY (role_id) REFERENCES roles(id),
        CONSTRAINT "FK_eee0b30f2ccac9355b8c28f7391" FOREIGN KEY (team_id) REFERENCES teams(id)
      );

       CREATE TABLE public.members_positions_positions (
        members_id int4 NOT NULL,
        positions_id int4 NOT NULL,
        CONSTRAINT "PK_75cc671cf5d3c6f81c5d91ad5e2" PRIMARY KEY (members_id, positions_id),
        CONSTRAINT "FK_21c2fd175735cf7b9259aa784d3" FOREIGN KEY (members_id) REFERENCES members(id) ON DELETE CASCADE,
        CONSTRAINT "FK_6a6b6ce8ae2049711fffc0952b0" FOREIGN KEY (positions_id) REFERENCES positions(id) ON DELETE CASCADE
      );

      `
    )

    await queryRunner.query(`
    INSERT INTO public.leagues (league_name) VALUES 
('66666')
,('654')
,('qdb');
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
          DROP TABLE IF EXISTS leagues CASCADE;
          DROP TABLE IF EXISTS members CASCADE;
          DROP TABLE IF EXISTS roles CASCADE;
          DROP TABLE IF EXISTS members_positions_positions CASCADE;
          DROP TABLE IF EXISTS teams CASCADE;
          DROP TABLE IF EXISTS positions CASCADE;`)
  }
}
