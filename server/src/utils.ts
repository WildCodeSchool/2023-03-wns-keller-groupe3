import { DataSource } from "typeorm";
import { User } from "./entities/User";
import "dotenv/config";

const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: process.env.POSTGRES_PASSWORD,
  database: "postgres",
  synchronize: true,
  entities: [User],
  logging: ["query", "error"],
});

export default dataSource;
