import { User } from "../db/db-entities/user.entity";
import { genSaltSync, hashSync } from "bcrypt";
import UserService from "../users/user.service";
import decryptPassword from "../common/utils/decryptPassword";
import { Credentials } from "./auth.interface";
import { sign } from "jsonwebtoken";
import { isObject } from "class-validator";
import { readFileSync } from "fs";

class AuthService {
    usresService: UserService;

    constructor() {
        this.usresService = new UserService();
    }

    public async signIn(credentials: Credentials): Promise<string | boolean> {
        try {
            const user: User | boolean = await this.usresService.findOneUser(credentials.email);
            let token: string = '';

            if (isObject<object>(user)) {

                // D O N T  F O R G E T  T H A T ! ! ! !
                // It's should work when the frontEnd will be connected.
                // if (!compareSync(decryptPassword(credentials.password), user.password)) return false;

                const userCredentials = {
                    email: user.email,
                    password: user.password
                };
                const privateKey: string = readFileSync("rsaKeys/private.pem", "utf8");
                token = sign(userCredentials, privateKey, {algorithm: "RS512"});
            }
            if (typeof token !== "string" && !token) return false;

            return token;
        } catch (err) {
            console.warn(err)
            return false;
        }
    }

    public async signUp(user: User): Promise<boolean | string[]>  {
        try {
            const encryptPass: string = user.password;
            const decryptPass: string = decryptPassword(encryptPass);
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
