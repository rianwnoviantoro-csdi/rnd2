import "dotenv/config";

export const env = {
  env: process.env.APP_ENV,
  host: process.env.APP_HOST,
  port: parseInt(<string>process.env.APP_PORT),
  pgHost: process.env.POSTGRES_HOST,
  pgPort: parseInt(<string>process.env.POSTGRES_PORT),
  pgUser: process.env.POSTGRES_USER,
  pgPass: process.env.POSTGRES_PASS,
  pgDBName: process.env.POSTGRES_NAME,
  secret: process.env.JWT_SECRET,
  refresh: process.env.JWT_REFRESH,
};
