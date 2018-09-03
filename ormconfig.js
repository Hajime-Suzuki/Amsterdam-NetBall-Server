module.exports = {
  type: 'postgres',
  // host: process.env.DB_HOSTNAME || 'localhost',
  // port: process.env.DB_PORT || 5432,
  // username: process.env.DB_USERNAME || 'test',
  // password: process.env.DB_PASSWORD || 'test',
  // database: process.env.DB_DATABASE_NAME || 'test',
  url: process.env.DATABASE_URL || process.env.DB_STRING,
  // synchronize: process.env.DATABASE_URL ? false : true,
  synchronize: false,
  logging: false,
  entities: ['build/entities/**/*.js'],
  migrations: ['build/migration/**/*.js'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'build/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  }
}
