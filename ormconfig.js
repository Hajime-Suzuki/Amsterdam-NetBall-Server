module.exports = {
  type: "postgres",
  url: process.env.DB_STRING || process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: ["build/entities/**/*.js"],
  migrations: ["build/migration/**/*.js"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "build/entities",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber"
  }
}
