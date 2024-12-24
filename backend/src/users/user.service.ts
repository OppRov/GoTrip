import { User } from "../db/db-entities/user.entity";
import { AppDataSource } from "../db/db-config";
import { EntityManager } from "typeorm";
import validateObject from "../common/utils/validateObject";
import { roles } from "../common/enums/roles";

class UserService {

    manager: EntityManager;

    constructor() {
        this.manager = AppDataSource.manager;
    }

    public async findAllUsers(): Promise<[] | User[]> {
        try {
            const data: User[] = await this.manager.find<User>(User);
            return data;
        } catch (err) {
            console.warn(err);
            return [];
        }
    }

    public async findOneUser(email: string): Promise<User | boolean> {
        try {
            const data: User | null = await this.manager.findOne<User>(User, { where: { email: email} });
            if (!data) return false;
            return data;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }

    public async createUser(user: User): Promise<boolean | string[] | [boolean, string]> {
        try {
            const userData: User = this.manager.create<User, User>(User, user);
            const validate: [] | string[] = await validateObject(userData);
            if (validate.length > 0) return validate;
            await this.manager.save(userData);
            return true;
        } catch (err: any) {
            const emailError: { email?: string } = JSON.parse(err["message"].slice(err["message"].indexOf('{'), err["message"].indexOf('}') + 2).replace("email", '"email"'));
            if (emailError.hasOwnProperty("email")) return [false, `The Email ${emailError?.email} already exists`];
            return false;
        }
    }

}

export default UserService;
