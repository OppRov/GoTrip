import { User } from "../db/db-entities/user.entity";
import { compare, compareSync, genSaltSync, hashSync } from "bcrypt";
import UserService from "../users/user.service";
import decryptPassword from "../common/utils/decryptPassword";
import { Credentials, UserAndToken } from "./auth.interface";
import { sign } from "jsonwebtoken";
import { isArray, isObject } from "class-validator";
import { readFileSync } from "fs";
import { CredentialsStatus } from "./auth.interface";
import { UserDTO } from "../common/dtos/user.dto";
import validateObject from "../common/utils/validateObject";

class AuthService {
    usersService: UserService;

    constructor() {
        this.usersService = new UserService();
    }

    public async signIn(credentials: Credentials): Promise<UserAndToken | CredentialsStatus | string[]> {
        const credentialsStatus: CredentialsStatus = {
            emailOK: true,
            passwordOK: true
        };
        try {
            const user: User | boolean = await this.usersService.findOneUser(credentials.email);
            let token: string = '';
            if (!isObject<User>(user)) {
                credentialsStatus.emailOK = false;
                return credentialsStatus;
            };
            // NOTE: Use this !compareSync(decryptPassword(credentials.password, user.password)) when you have an encryption in the frontEnd.
            if (!compareSync(credentials.password, user?.password)) {
                credentialsStatus.passwordOK = false;
                return credentialsStatus;
            }
            const userCredentials = {
                email: user.email,
                password: user.password
            };
            const secretKey: string = process.env.TOKEN_SECRET_KEY!;
            token = sign(userCredentials, secretKey, { expiresIn: "1d" });
            if (typeof token !== "string" && !token) {
                credentialsStatus.emailOK = false;
                credentialsStatus.passwordOK = false;
                return credentialsStatus;
            }
            const userInfo: UserDTO = {
                id: user?._id,
                firstName: user?.firstName,
                lastName: user?.lastName,
                email: user?.email,
                role: user?.role
            };

            const validate: [] | string[] = await validateObject(userInfo);
            if (validate.length > 0) return validate;

            return { userInfo, token }
        } catch (err) {
            console.warn(err)
            credentialsStatus.emailOK = false;
            credentialsStatus.passwordOK = false;
            return credentialsStatus;
        }
    }

    public async signUp(user: User): Promise<boolean | string[] | [boolean, string]>  {
        try {
            const encryptPass: string = user?.password;
            // NOTE: Use this decryptPassword(encryptPass) when you have an encryption in the frontEnd.
            const decryptPass: string = encryptPass;
            const salt: string = genSaltSync(10);
            if (typeof decryptPass === "string" && decryptPass) user.password = hashSync(decryptPass, salt);
            else return false;

            const userData: boolean | string[] | [boolean, string] = await this.usersService.createUser(user);
            if (isArray(userData) && userData.length > 0) return userData;

            return true;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }

}

export default AuthService;
