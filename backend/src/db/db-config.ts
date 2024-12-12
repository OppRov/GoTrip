import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";

config();

const DB_CONFIG: MongoConnectionOptions = {
    type: "mongodb",
    database: "gotrip",
    url: process.env.MONGO_DB_URL,
    useNewUrlParser: true,
    entities: [`${__dirname}/db-entities/**/*{.ts,.js}`],
    logging: true,
    synchronize: true,
    migrations: [`${__dirname}/migrations/**/*{.ts,.js}`]
};

export const AppDataSource = new DataSource(DB_CONFIG);