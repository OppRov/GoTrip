import { ValidationError, validate } from "class-validator";
import { Entity } from "../types/entities";

export default async function validateObject(data: object): Promise<[] | string[]> {

    const validateUser: ValidationError[] = await validate(data);

    if (validateUser.length > 0) {
        const arr: string[] = [];

        for (let i = 0; i < validateUser.length; i++) {
            const properties: string[] = Object.getOwnPropertyNames(validateUser[i].constraints);
            for (let j = 0; j < properties.length; j++) {
                arr.push(validateUser[i]?.constraints![properties[j]]);
            }
        }

        return arr;
    };
    return [];
}
