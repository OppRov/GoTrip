import { Express, Request, Response } from "express";
import TripService from "./trip.service";
import { HttpStatus } from "../common/enums/http-status";
import { InnerResponse } from "../common/interfaces/response.interface";
import { Trip } from "../db/db-entities/trip.entity";
import { isArray } from "class-validator";

class TripController {

    app: Express;
    service: TripService;
    innerResponse: InnerResponse;
    ROUTE_NAME: string;

    constructor(app: Express, routeName: string) {
        this.app = app;
        this.service = new TripService();
        this.innerResponse = {
            message: "Success",
            status: HttpStatus.OK,
            data: null,
        };
        this.ROUTE_NAME = routeName;
    }

    public findAll(): void {
        this.app.get(`/${this.ROUTE_NAME}/`, async (req: Request, res: Response) => {
            try {
                const users: [] | Trip[] = await this.service.findAllTrips()
                this.innerResponse.data = users;
                this.innerResponse.message = "Success";
                if (!users.length) throw new Error("There is no trips");
                res.status(this.innerResponse.status).send(this.innerResponse);
            } catch (err) {
                this.innerResponse.message = err?.toString()!;
                this.innerResponse.data = null;
                res.status(this.innerResponse.status).send(this.innerResponse);
            }
        });
    }

    public findOne(): void {
        this.app.get(`/${this.ROUTE_NAME}/:id`, async (req: Request, res: Response) => {
            try {
                const trip: Trip | boolean = await this.service.findOneTrip(req.params.id)
                this.innerResponse.data = trip;
                this.innerResponse.message = "Success";
                if (!trip) throw new Error("Trip not found");
                res.status(this.innerResponse.status = HttpStatus.OK).send(this.innerResponse);
            } catch (err) {
                this.innerResponse.message = err?.toString()!;
                res.status(this.innerResponse.status = HttpStatus.NOT_FOUND).send(this.innerResponse);
            }
        });
    }

    public createTrip(): void {
        this.app.post(`/${this.ROUTE_NAME}`, async (req: Request, res: Response) => {
            try {
                const trip: boolean | string[] | [boolean, string] = await this.service.createTrip(req.body);
                this.innerResponse.data = trip;
                if (isArray(trip) && trip.length > 0) {
                    if (typeof trip[0] === "boolean") {
                        this.innerResponse.data = null;
                        throw new Error(trip[1]);
                    }
                    throw new Error("An error occurred");
                }
                this.innerResponse.message = "Trip created successfully";
                res.status(this.innerResponse.status = HttpStatus.CREATED).send(this.innerResponse);
            }
            catch (err) {
                this.innerResponse.message = err?.toString()!;
                res.status(this.innerResponse.status = HttpStatus.BAD_REQUEST).send(this.innerResponse);
            }
        });
    }
}

export default TripController;