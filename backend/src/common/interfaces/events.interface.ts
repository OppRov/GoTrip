import { IsDateString } from "class-validator";

export interface Events {
    id:      string;
    title:   string;
    address: string;
    start:   string;
    end:     string;
}