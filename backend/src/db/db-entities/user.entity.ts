import { IsBoolean, IsEmail, IsEnum, IsMobilePhone, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ObjectIdColumn } from "typeorm"
import { roles } from "../../common/enums/roles";

@Entity()
export class User {
    @ObjectIdColumn({ primary: true })
    _id: string;

    @Column()
    @IsString()
    firstName: string;

    @Column()
    @IsString()
    lastName: string;

    @Column()
    @IsStrongPassword()
    password: string;

    @Column()
    @IsEmail()
    email: string;

    // FIXME: Change this to be default "user" and block the end user of Signup to give himself a role.
    @Column({ default: "user" })
    @IsEnum(roles)
    role: string;
}