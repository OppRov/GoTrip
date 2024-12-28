import { IsDateString } from "class-validator";

export interface Itinerary {
    date: Date;
    events: { name: string, time: string } []
};