import { NextFunction, Request, Response } from "express";
import { readFileSync } from "fs";
import { verify } from "jsonwebtoken";
import { HttpStatus } from "../enums/http-status";
import { InnerResponse } from "../interfaces/response.interface";

class Middleware {
    req: Request;
    res: Response;
    next: NextFunction;

    constructor(req: Request, res: Response, next: NextFunction) {
        this.req  = req;
        this.res = res;
        this.next = next;
    }

    public authMiddleware(): void {
        const token: string = this.req.headers.authorization?.split(' ')[1] || '';
        const secretKey: string = process.env.TOKEN_SECRET_KEY!;
        const publicRouts: string[] = [
            "/auth/signIn",
            "/auth/signUp",
            "/trips/getRecommendedTrips"
        ];
        try {
            const route = publicRouts.find((route: string) => this.req.originalUrl.startsWith(route));
            if (route || verify(token, secretKey)) return this.next();
        } catch(error: any) {
            const response: InnerResponse = {
                message: "ERROR: [UNAUTHORIZED]",
                status: HttpStatus.UNAUTHORIZED
            };
            console.log(error)
            if (error?.message) response.data = error;
            this.res.status(HttpStatus.UNAUTHORIZED).send(response);
        }
    }
}

export default Middleware;
