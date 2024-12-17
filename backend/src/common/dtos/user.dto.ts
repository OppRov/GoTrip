import { IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { roles } from "../enums/roles";

export class UserDTO {

    @IsMongoId()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsEnum(roles)
    @IsNotEmpty()
    role: string;
}
