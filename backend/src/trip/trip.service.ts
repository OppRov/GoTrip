import { Itinerary } from "../common/interfaces/itinerary.interface";
import { EntityManager, FindOptionsWhere } from "typeorm";
import { isDateString, isString } from "class-validator";
import validateObject from "../common/utils/validateObject";
import { Trip } from "../db/db-entities/trip.entity";
import { AppDataSource } from "../db/db-config";
import { ObjectId } from "mongodb";

class TripService {
    manager: EntityManager;

    constructor() {
        this.manager = AppDataSource.manager;
    }

    public async findAllTrips(): Promise<[] | Trip[]> {
        try {
            const data: Trip[] = await this.manager.find<Trip>(Trip);
            return data;
        } catch (err) {
            console.warn(err);
            return [];
        }
    }

    public async findOneTrip(id: string): Promise<Trip | boolean> {
        try {
            const data: Trip | null = await this.manager.findOne<Trip>(Trip, { where: { _id: new ObjectId(id) as any } });
            if (!data) return false;
            return data;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }

    public async createTrip(trip: Trip): Promise<boolean | string[] | [boolean, string]> {
        try {
            const tripData: Trip = this.manager.create<Trip, Trip>(Trip, trip);
            if (await this.findOneTrip(tripData._id)) throw new Error("Trip with this ID already exist")
            const validate: [] | string[] = await validateObject(tripData);
            trip.itinerary.map((val1: Itinerary, index1: number) => {
                val1.events.map((val2: { name: string, time: string }, index2: number) => {
                    if (!isDateString(val1.date) || !isString(val2.name) || !isString(val2.time)) throw new Error("Itinerary object is not valid, please check it.");
                });
            });
            if (validate.length > 0) return validate;
            await this.manager.save(tripData);
            return true;
        } catch (err: any) {
            console.error("Error: ", err);
            return [false, err];
        }
    }

}

export default TripService;
