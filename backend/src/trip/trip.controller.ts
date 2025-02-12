import { Express, Request, Response } from "express";
import TripService from "./trip.service";
import { HttpStatus } from "../common/enums/http-status";
import { InnerResponse } from "../common/interfaces/response.interface";
import { Trip } from "../db/db-entities/trip.entity";
import { isArray, isString } from "class-validator";
import { GooglePlacesResponse, WeatherData } from "./trip.interface";

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
        this.app.get(`/${this.ROUTE_NAME}/getAllTripsUser/:id?`, async (req: Request, res: Response) => {
            try {
                let emptyOptions = {};
                const trips: [] | Trip[] = await this.service.findAllTrips(req.params.id, !req.params.id ? emptyOptions : '')
                this.innerResponse.data = trips;
                this.innerResponse.message = "Success";
                if (!trips.length) throw new Error("There is no trips");
                res.status(this.innerResponse.status = HttpStatus.OK).send(this.innerResponse);
            } catch (err) {
                this.innerResponse.message = err?.toString()!;
                this.innerResponse.data = null;
                res.status(this.innerResponse.status = HttpStatus.NOT_FOUND).send(this.innerResponse);
            }
        });
    }

    public findOne(): void {
        this.app.get(`/${this.ROUTE_NAME}/findOneTrip/:id`, async (req: Request, res: Response) => {
            try {
                const trip: Trip | boolean = await this.service.findOneTrip(req.params.id)
                this.innerResponse.data = trip;
                this.innerResponse.message = "Success";
                if (!trip) {
                    this.innerResponse.status = HttpStatus.NOT_FOUND;
                    throw new Error("Trip not found");
                }
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

    public editTrip(): void {
        this.app.put(`/${this.ROUTE_NAME}`, async (req: Request, res: Response) => {
            try {
                const updatedTrip: boolean = await this.service.editTrip(req.body);
                this.innerResponse.message = "Trip update successfully";
                this.innerResponse.data = updatedTrip;
                if (!updatedTrip) throw new Error("Trip update failed");
                res.status(this.innerResponse.status = HttpStatus.CREATED).send(this.innerResponse);
            }
            catch (err) {
                this.innerResponse.message = err?.toString()!;
                res.status(this.innerResponse.status = HttpStatus.BAD_REQUEST).send(this.innerResponse);
            }
        });
    }

    public getPlacesForTrip(): void {
        this.app.get(`/${this.ROUTE_NAME}/getGooglePlaces/:place`, async (req: Request, res: Response) => {
            try {
                const place: string = req.params.place;
                if (!isString(place)) throw new Error("The place is not a valid place");
                const places: GooglePlacesResponse | boolean = await this.service.getGooglePlaces(place);
                if (typeof places === "boolean") throw new Error("An error occurred");
                this.innerResponse.data = places;
                this.innerResponse.message = "Google places";
                res.status(this.innerResponse.status = HttpStatus.OK).send(this.innerResponse);
            } catch (err) {
                this.innerResponse.message = err?.toString()!;
                res.status(this.innerResponse.status = HttpStatus.BAD_REQUEST).send(this.innerResponse);
            }
        });
    }

    public getRecommendedTrips(): void {
        this.app.get(`/${this.ROUTE_NAME}/getRecommendedTrips`, async (req: Request, res: Response) => {
            try {
                const recommendedTrips: [] | Trip[] = await this.service.getRecommendedTrips();
                this.innerResponse.data = recommendedTrips;
                this.innerResponse.message = "Success";
                if (!recommendedTrips.length) throw new Error("There is no recommended trips");
                res.status(this.innerResponse.status = HttpStatus.OK).send(this.innerResponse);
            } catch (err) {
                this.innerResponse.message = err?.toString()!;
                this.innerResponse.data = null;
                res.status(this.innerResponse.status = HttpStatus.NOT_FOUND).send(this.innerResponse);
            }
        });
    }

    public getWeather():void {
        this.app.get(`/${this.ROUTE_NAME}/getWeather/:cityName`, async (req: Request, res: Response) => {
            try {
                if (!req.params.cityName) throw new Error("There is no city name");
                const weatherData: boolean | WeatherData = await this.service.getWeather(req.params.cityName);
                if (typeof weatherData === "boolean") throw new Error("An error occurred, please check your city name.");
                if (parseInt(weatherData.cod.toString()) === 404) throw new Error(weatherData?.message);
                this.innerResponse.data = weatherData;
                this.innerResponse.message = "Success";
                res.status(this.innerResponse.status = HttpStatus.OK).send(this.innerResponse);
            } catch (error) {
                console.log(error);
                this.innerResponse.message = error?.toString()!;
                this.innerResponse.data = null;
                res.status(this.innerResponse.status = HttpStatus.NOT_FOUND).send(this.innerResponse);
            }
        });
    }

    public deleteTrip(): void {
        this.app.delete(`/${this.ROUTE_NAME}/deleteTrip/:id`, async (req: Request, res: Response) => {
            try {
                if (!req.params.id) throw new Error("There is no TripId");
                const deletedTrip: Trip | boolean = await this.service.deleteTrip(req.params.id);
                if (typeof deletedTrip === "boolean") throw new Error("An error occurred");
                this.innerResponse.data = deletedTrip;
                this.innerResponse.message = "Success";
                res.status(this.innerResponse.status = HttpStatus.OK).send(this.innerResponse);
            } catch (error) {
                console.log(error);
                this.innerResponse.message = error?.toString()!;
                this.innerResponse.data = null;
                res.status(this.innerResponse.status = HttpStatus.NOT_FOUND).send(this.innerResponse);
            }
        });
    }
}

export default TripController;