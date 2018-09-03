import { createConnection, getConnectionOptions } from 'typeorm'
import { DefaultNamingStrategy } from 'typeorm/naming-strategy/DefaultNamingStrategy'
import { NamingStrategyInterface } from 'typeorm/naming-strategy/NamingStrategyInterface'
import { snakeCase } from 'typeorm/util/StringUtils'
import { Activity } from './entities/Activity'
import { ActivityAttendance } from './entities/ActivityAttendance'
import { Committee } from './entities/Committee'
import { League } from './entities/League'
import { Member } from './entities/Member'
import { Message } from './entities/Message'
import { Position } from './entities/Position'
import { Role } from './entities/Role'
import { Team } from './entities/Team'

class CustomNamingStrategy extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ? userSpecifiedName : snakeCase(targetName) + 's'
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[]
  ): string {
    return snakeCase(
      embeddedPrefixes.concat(customName ? customName : propertyName).join('_')
    )
  }

  columnNameCustomized(customName: string): string {
    return customName
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName)
  }
}

export const connectDatabase = async () => {
  const dbSettings = await getConnectionOptions()
  const settings = {
    ...dbSettings,
    entities: [
      Activity,
      ActivityAttendance,
      Committee,
      League,
      Member,
      Message,
      Position,
      Role,
      Team
    ]
    // namingStrategy: new CustomNamingStrategy()
  }

  const connection = await createConnection(settings)
  console.log('Connected to Postgres with TypeORM')
  // await connection.undoLastMigration()
  // await connection.runMigrations()
  // console.log('Migration Done')
  return connection
}

// module.exports = {
//   namingStrategy: CustomNamingStrategy
// }
