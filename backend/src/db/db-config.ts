import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";

config();
// mongodb+srv://elazar252:l4DgXFvZZAiJdKIB@gotrip.tibur.mongodb.net/?retryWrites=true&w=majority&appName=goTrip
const DB_CONFIG: MongoConnectionOptions = {
    type: "mongodb",
    database: "gotrip",
    url: process.env.MONGO_DB_URL,
    useNewUrlParser: true,
    entities: ["src/db/db-entities/**/*{.ts,.js}"],
    logging: true,
    synchronize: true,
    migrations: ["src/db/migrations/**/*{.ts,.js}"]
};

export const AppDataSource = new DataSource(DB_CONFIG);