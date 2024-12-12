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
        // Use it when encrytion work on frontend
        // const publicKey: string = readFileSync("rsaKeys/public.pem", "utf8");
        try {
            if (this.req.originalUrl.includes("signIn") || this.req.originalUrl.includes("signUp") || verify(token, "publicKey")) return this.next();
        } catch(error: any) {
            const response: InnerResponse = {
                message: "ERROR: [UNAUTHORIZED]",
                status: HttpStatus.UNAUTHORIZED
            };
            if (error?.message) response.data = error;
            this.res.status(HttpStatus.UNAUTHORIZED).send(response);
        }
    }
}

export default Middleware;