import { DataSource } from "typeorm";

import { User } from "./entities/User";
import { City } from "./entities/City";
import { Category } from "./entities/Category";
import { POI } from "./entities/POI";

import "dotenv/config";

const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: [Category, City, POI, User],
  logging: ["query", "error"],
});

export default dataSource;
