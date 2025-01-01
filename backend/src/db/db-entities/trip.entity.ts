import { IsNumber, IsString, IsDateString, IsBoolean, IsArray, IsOptional } from "class-validator";
import { Column, Entity, ManyToOne, ObjectIdColumn} from "typeorm";
import { User } from "./user.entity";
import { Itinerary } from "../../common/interfaces/itinerary.interface";

@Entity()
export class Trip {
    @ObjectIdColumn({ primary: true })
    _id: string;

    @Column()
    @ManyToOne(() => User, (user: User) => user._id)
    @IsString()
    userID: string;

    @Column()
    @IsString()
    tripName: string;

    @Column()
    @IsDateString()
    fromDate: Date;

    @Column()
    @IsDateString()
    toDate: Date;

    @Column()
    @IsNumber()
    budget: number;

    @Column()
    @IsString()
    location: string;

    @Column()
    @IsArray()
    itinerary: Itinerary [];

    @Column({ default: false, type: "bool" })
    @IsBoolean()
    recommended: boolean;

    @Column({ default: 0, type: "int64" })
    @IsNumber()
    ratingCount: number;
}