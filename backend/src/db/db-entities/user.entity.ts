import { IsBoolean, IsEmail, IsMobilePhone, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ObjectIdColumn } from "typeorm"

@Entity()
export class User {
    @ObjectIdColumn()
    objID: number;

    @Column()
    @IsString()
    firstName: string;

    @Column()
    @IsString()
    lastName: string;

    @Column()
    @IsMobilePhone()
    @IsPhoneNumber("IL")
    phoneNumber: string;

    @Column()
    @IsStrongPassword()
    password: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsBoolean()
    isActive: boolean;
}
