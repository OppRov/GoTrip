import { UserDTO } from "../common/dtos/user.dto";

export interface Credentials {
    email: string;
    password: string;
}

export interface CredentialsStatus {
    emailOK: boolean;
    passwordOK: boolean;
}

export interface UserAndToken {
    userInfo: UserDTO;
    token: string;
}
