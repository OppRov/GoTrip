import { Events } from "../common/interfaces/events.interface";
import { EntityManager, FindManyOptions, Entity } from "typeorm";
import { isDateString, isEmpty, isString, isObject } from "class-validator";
import validateObject from "../common/utils/validateObject";
import { Trip } from "../db/db-entities/trip.entity";
import { AppDataSource } from "../db/db-config";
import { ObjectId } from "mongodb";
import { customsearch_v1, google } from "googleapis";
import { PlaceDTO, GooglePlacesResponse, WeatherData } from "./trip.interface";

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
            // FIXME: Error here.
            trip.events.map((event: Events, index1: number) => {
                if (!isDateString(event.id) || !isString(event.title) || !isString(event.address) || !isString(event.start) || !isString(event.end)) throw new Error("Events object is not valid, please check it.");
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

    public async getGooglePlaces(place: string): Promise<GooglePlacesResponse | boolean> {
        try {
            const response: Response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place.split(" ").join("%20")}&key=${process.env.GOOGLE_API_KEY}`);
            const places = await response.json();

            const placesResult: PlaceDTO[] = places.results.filter((place: any) => place.business_status === "OPERATIONAL").map((place: PlaceDTO) => {
                return {
                    business_status: place.business_status,
                    formatted_address: place.formatted_address,
                    name: place.name,
                    opening_hours: place.opening_hours,
                    place_id: place.place_id,
                    price_level: place.price_level,
                    rating: place.rating,
                    types: place.types,
                    user_ratings_total: place.user_ratings_total
                }
            });

            const customSearch = google.customsearch("v1");
            const res = customSearch.cse.list({
                auth: process.env.GOOGLE_API_KEY,
                q: `${place} cityimages`,
                cx: "a77c2f54ccbb5455a",
                searchType: "image",
                imgSize: "xlarge",
                num: 10,
            });
            const imagesUrls = (await res)?.data?.items!.map((item: customsearch_v1.Schema$Result) => item.link);
            return { placesResult, imagesUrls };
        } catch(err: any) {
            console.log(err);
            return false;
        }
    }

    public async getRecommendedTrips(): Promise<[] | Trip[]> {
        try {
            const trips: [] | Trip[] = await this.manager.find<Trip>(Trip);
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
            return filterTrips;
        } catch (err) {
            console.warn(err);
            return [];
        }
    }

    public async getWeather(cityName: string): Promise<WeatherData | boolean> {
        try {
            if (!cityName) throw new Error();
            const weather: Response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_API_KEY}`);
            const weatherJSON: WeatherData = await weather.json();
            if (!isObject<WeatherData>(weatherJSON)) return false;
            if (weatherJSON.cod === 404) return false;
            return weatherJSON;
        } catch (error) {
            console.log(error);
            return false
        }
    }

}

export default TripService;