import { IsEmail, IsEnum, IsHash, IsString, IsStrongPassword } from "class-validator";
import { Column, Entity, ObjectIdColumn } from "typeorm";
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

    @Column({ select: false })
    @IsStrongPassword()
    password: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column({ default: "user" })
    @IsEnum(roles)
    role: string;
}
