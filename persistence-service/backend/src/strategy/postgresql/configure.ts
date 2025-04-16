import { DataSource } from "typeorm";
import { Personal } from "./personal/personal";
import { Movie } from "./movie/movie";
import { ProductionStaff } from "./productionstaff/productionstaff";
import { Contract } from "./contract/contract";
import { Involvement } from "./involvement/involvement";

export const postgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Personal, Movie, ProductionStaff, Contract, Involvement],
  synchronize: true,
  logging: false,
});
