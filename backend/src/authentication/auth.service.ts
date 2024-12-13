import { User } from "../db/db-entities/user.entity";
import { compare, compareSync, genSaltSync, hashSync } from "bcrypt";
import UserService from "../users/user.service";
import decryptPassword from "../common/utils/decryptPassword";
import { Credentials } from "./auth.interface";
import { sign } from "jsonwebtoken";
import { isObject } from "class-validator";
import { readFileSync } from "fs";
import { CredentialsStatus } from "../common/interfaces/credentialsStatus.interface";

class AuthService {
    usresService: UserService;

    constructor() {
        this.usresService = new UserService();
    }

    public async signIn(credentials: Credentials): Promise<string | CredentialsStatus> {
        const credentialsStatus: CredentialsStatus = {
            usernameOK: true,
            passwordOK: true
        };
        try {
            const user: User | boolean = await this.usresService.findOneUser(credentials.email);
            let token: string = '';

            if (!isObject<object>(user)) {
                credentialsStatus.usernameOK = false;
                return credentialsStatus;
            };
            // NOTE: Use this !compareSync(decryptPassword(credentials.password, user.password)) when you have an encryption in the frontEnd.
            if (!compareSync(credentials.password, user.password)) {
                credentialsStatus.passwordOK = false;
                return credentialsStatus;
            }
            const userCredentials = {
                email: user.email,
                password: user.password
            };
            const privateKey: string = readFileSync("RSA-keys/private.pem", "utf8");
            token = sign(userCredentials, privateKey, {algorithm: "RS512"});
            if (typeof token !== "string" && !token) {
                credentialsStatus.usernameOK = false;
                credentialsStatus.passwordOK = false;
                return credentialsStatus;
            }
            return token;
        } catch (err) {
            console.warn(err)
            credentialsStatus.usernameOK = false;
            credentialsStatus.passwordOK = false;
            return credentialsStatus;
        }
    }

    public async signUp(user: User): Promise<boolean | string[]>  {
        try {
            const encryptPass: string = user.password;
            // NOTE: Use this decryptPassword(encryptPass) when you have an encryption in the frontEnd.
            const decryptPass: string = encryptPass;
            const salt: string = genSaltSync(10);
            if (typeof decryptPass === "string" && decryptPass) user.password = hashSync(decryptPass, salt);
            else return false;

            const userData: boolean | string[] = await this.usresService.createUser(user);
            if (Array.isArray(userData) && userData.length > 0 || !userData) return userData;

            return true;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }

}

export default AuthService;
