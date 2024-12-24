import { IsNumber, IsString, IsDateString, IsObject, IsArray } from "class-validator";
import { Column, Entity, ManyToOne, ObjectIdColumn, OneToMany, TableForeignKey } from "typeorm";
import { roles } from "../../common/enums/roles";
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
}