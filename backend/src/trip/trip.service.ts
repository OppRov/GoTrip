import { Itinerary } from "../common/interfaces/itinerary.interface";
import { EntityManager, FindManyOptions, Entity } from "typeorm";
import { isDateString, isEmpty, isString } from "class-validator";
import validateObject from "../common/utils/validateObject";
import { Trip } from "../db/db-entities/trip.entity";
import { AppDataSource } from "../db/db-config";
import { ObjectId } from "mongodb";
import { customsearch_v1, google } from "googleapis";

class TripService {
    manager: EntityManager;

    constructor() {
        this.manager = AppDataSource.manager;
    }

    public async findAllTrips(userID: string, options?: FindManyOptions<typeof Entity>): Promise<[] | Trip[]> {
        try {
            const data: Trip[] = await this.manager.find<Trip>(Trip, isEmpty(options) ? { where: { userID: userID } } : options);
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

    public async editTrip(newTrip: any): Promise<boolean> {
        try {
            const trip: any | boolean = await this.findOneTrip(newTrip._id);
            if (!trip || typeof trip === "boolean") return false;
            const tripKeys: string[] = Object.keys(newTrip);
            tripKeys.map(value => value !== "_id" ?  trip[value] = newTrip[value] : trip[value] = trip[value]);
            await this.manager.save(trip);
            return true;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }

    public async getGooglePlaces(place: string): Promise<any> {
        try {
            const response: Response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place.split(" ").join("%20")}&key=${process.env.GOOGLE_API_KEY}`);
            const places = await response.json();

            const customSearch = google.customsearch("v1");
            const res = customSearch.cse.list({
                auth: process.env.GOOGLE_API_KEY,
                q: `${place} cityimages`,
                cx: "a77c2f54ccbb5455a",
                searchType: "image",
                imgSize: "xlarge",
                num: 10,
            });
            const imageUrls = (await res)?.data?.items!.map((item: customsearch_v1.Schema$Result) => item.link);
            return { places, imageUrls };
        } catch(err: any) {
            console.log(err);
            return false;
        }
    }

    public async getRecommendedTrips(userID: string): Promise<[] | Trip[]> {
        try {
            const trips: [] | Trip[] = await this.findAllTrips(userID, { where: { userID: userID } });
            const filterTrips: Trip[] = trips.filter((value) => value.recommended && value.ratingCount).sort((a: Trip, b: Trip) => a.ratingCount-b.ratingCount);
            let temp = filterTrips[0].ratingCount, count = 0;
            const recommendedTrips: Trip[] = [];
            for (let i = 0; i < filterTrips.length; i++) {
                if (filterTrips[i].ratingCount > temp) {
                    temp = filterTrips[i].ratingCount;
                    recommendedTrips[count++] = filterTrips[i];
                }
            }
            const rtl: number = recommendedTrips.length-1;
            return [
                recommendedTrips[rtl],
                recommendedTrips[rtl-1],
                recommendedTrips[rtl-2]
            ];
        } catch (err) {
            console.warn(err);
            return [];
        }
    }

}

export default TripService;