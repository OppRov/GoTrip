import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./db/db-config";
import methodsBind from "./routes";
import UserController from "./users/user.controller";
import AuthController from "./authentication/auth.controller";
import cors from "cors";
import Middleware from "./common/middleware/middleware";
import { Controllers } from "./common/types/controllers";
import TripController from "./trip/trip.controller";

const app = express();
config();
app.use(cors());
app.use(bodyParser.json())

AppDataSource.initialize()
.then(() => {
    AppDataSource.synchronize();
    console.log("Data Source has been initialized!")
})
.catch((err) => {
    console.error("[Error during Data Source initialization]", err);
});

// Middleware
app.use((req: Request, res: Response, next: NextFunction) => methodsBind([new Middleware(req, res, next)]));

const controllers: Controllers[] = [
    new UserController(app, "users"),
    new AuthController(app, "auth"),
    new TripController(app, "trips")
];
methodsBind(controllers);

app.listen(process.env.PORT, () => {
    console.log(`goTrip app listening on PORT: ${process.env.PORT}`);
});