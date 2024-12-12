import { IsEmail, IsMobilePhone, IsPhoneNumber, IsString } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn, OneToOne } from "typeorm"
import { User } from "./user.entity";

/*
    Create: Account info:
        [X] Customer lastName
        [X] Customer firstName
        [X] Customer phoneNumber
        [X] Customer email
        [X] Customer country
        [X] Customer city
        [X] Customer street
        [] Customer money -> (Balance, savings, loans, interest on loans)
*/

@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    lastName: string;

    @Column()
    @IsString()
    firstName: string;

    @Column()
    @IsString()
    @IsMobilePhone()
    @IsPhoneNumber("IL")
    phoneNumber: string;

    @Column()
    @IsString()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    country: string;

    @Column()
    @IsString()
    city: string;

    @Column()
    @IsString()
    street: string;

    @Column()
    @IsString()
    money: string;

    @Column()
    @OneToOne(() => User)
    @JoinColumn({
        name: "userID",
        foreignKeyConstraintName:"",
        referencedColumnName: "id"
    })
    userID: number;
}
