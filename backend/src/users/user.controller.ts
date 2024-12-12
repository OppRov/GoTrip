import { Express, Request, Response } from "express";
import UserService from "./user.service";
import { HttpStatus } from "../common/enums/http-status";
import { InnerResponse } from "../common/interfaces/response.interface";
import { User } from "../db/db-entities/user.entity";

// @Auth(true)
class UserController {

    app: Express;
    service: UserService;
    innerResponse: InnerResponse;
    ROUTE_NAME: string;

    constructor(app: Express, routeName: string) {
        this.app = app;
        this.service = new UserService();
        this.innerResponse = {
            message: "Success",
            status: HttpStatus.OK,
            data: null,
        };
        this.ROUTE_NAME = routeName;
    }

    public findAll(): void {
        this.app.get(`/${this.ROUTE_NAME}/`, async (req: Request, res: Response) => {
            try {
                const users: [] | User[] = await this.service.findAllUsers()
                this.innerResponse.data = users;
                this.innerResponse.message = "Success";
                if (!users.length) throw new Error("There is no users").message
                res.status(this.innerResponse.status).send(this.innerResponse);
            } catch (err) {
                this.innerResponse.message = err?.toString()!;
                this.innerResponse.data = null;
                res.status(this.innerResponse.status).send(this.innerResponse);
            }
        });
    }

    public findOne(): void {
        this.app.get(`/${this.ROUTE_NAME}/:id`, async (req: Request, res: Response) => {
            try {
                const user: User | boolean = await this.service.findOneUser(req.params.email)
                this.innerResponse.data = user;
                this.innerResponse.message = "Success";
                if (!user) throw new Error("User not found").message;
                res.status(this.innerResponse.status = HttpStatus.OK).send(this.innerResponse);
            } catch (err) {
                this.innerResponse.message = err?.toString()!;
                res.status(this.innerResponse.status = HttpStatus.NO_CONTENT).send(this.innerResponse);
            }
        });
    }

    public createUser(): void {
        this.app.post(`/${this.ROUTE_NAME}`, async (req: Request, res: Response) => {
            try {
                const user: User | boolean | string[] = await this.service.createUser(req.body);
                this.innerResponse.data = user;
                this.innerResponse.message = "User Created successfully";
                if (Array.isArray(user) && user.length > 0|| !user) throw new Error("An error occurred").message;
                res.status(this.innerResponse.status = HttpStatus.CREATED).send(this.innerResponse);
            }
            catch (err) {
                console.error("Error: ", err);
                this.innerResponse.message = err?.toString()!;
                res.status(this.innerResponse.status = HttpStatus.BAD_REQUEST).send(this.innerResponse);
            }
        });
    }
}

export default UserController;
