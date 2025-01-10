import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Blog } from "./models/Blog";
import dotenv from "dotenv";
import { Role } from "./models/Role";
import { Permission } from "./models/Permission";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === "development",
  entities: [User, Blog, Role, Permission],
});
