import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Blog } from "./models/Blog";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Use only for development
  entities: [User, Blog],
});
