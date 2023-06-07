import { DataSource } from "typeorm";
import { User } from "./entities/User";
import "dotenv/config";
import { City } from "./entities/City";
import { Category } from "./entities/Category";
import { POI } from "./entities/POI";

const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: process.env.POSTGRES_PASSWORD,
  database: "postgres",
  synchronize: true,
  entities: [Category, City, POI, User],
  logging: ["query", "error"],
});

export default dataSource;
