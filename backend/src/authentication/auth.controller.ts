import { Express, Request, Response } from "express";
import AuthService from "./auth.service";
import { HttpStatus } from "../common/enums/http-status";
import { InnerResponse } from "../common/interfaces/response.interface";
import { CredentialsStatus, UserAndToken } from "./auth.interface";
import { isArray, isObject } from "class-validator";

class AuthController {

    app: Express;
    service: AuthService;
    innerResponse: InnerResponse;
    ROUTE_NAME: string;

    constructor(app: Express, routeName: string) {
        this.app = app;
        this.service = new AuthService();
        this.innerResponse = {
            message: "Success",
            status: HttpStatus.OK,
            data: null
        };
      this.ROUTE_NAME = routeName;
    }

    public signIn(): void {
        this.app.post(`/${this.ROUTE_NAME}/signIn`, async (req: Request, res: Response) => {
            try {
                const signInData: UserAndToken | CredentialsStatus | string[] = await this.service.signIn(req.body);
                if (isObject<CredentialsStatus>(signInData)) {
                    if (signInData.hasOwnProperty("emailOK") && signInData.hasOwnProperty("passwordOK")) {
                        if (!signInData?.emailOK) throw new Error("Email not exist");
                        throw new Error("Invalid password");
                    }
                }
                if (isArray(signInData)) throw new Error(signInData.join("\n"));

                this.innerResponse.message = "You signin successfully";
                this.innerResponse.data = signInData;
                res.status(this.innerResponse.status = HttpStatus.OK).send(this.innerResponse);
            } catch (err) {
                this.innerResponse.message = err?.toString()!;
                this.innerResponse.data = null;
                res.status(this.innerResponse.status = HttpStatus.NOT_FOUND).send(this.innerResponse);
            }
        });
    }

    public signUp(): void {
        this.app.post(`/${this.ROUTE_NAME}/signUp`, async (req: Request, res: Response) => {
            try {
                const user: boolean | string[] | [boolean, string] = await this.service.signUp(req.body);
                this.innerResponse.data = user;
                if (Array.isArray(user) && user.length > 0) {
                    if (typeof user[0] === "boolean") {
                        this.innerResponse.data = null;
                        throw new Error(user[1]);
                    }
                    throw new Error("An error occurred");
                }

                this.innerResponse.message = "You signup was successfully";
                res.status(this.innerResponse.status = HttpStatus.CREATED).send(this.innerResponse);
            } catch (err) {
                this.innerResponse.message = err?.toString()!;
                res.status(this.innerResponse.status = HttpStatus.BAD_REQUEST).send(this.innerResponse);
            }
        });
    }
}

export default AuthController;
