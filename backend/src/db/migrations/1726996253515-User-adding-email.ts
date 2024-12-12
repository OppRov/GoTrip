import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";
import { User } from "../db-entities/user.entity";

export class UserAddingEmail1726996253515 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('user', new TableColumn({
                name: 'email',
                type: 'varchar',
                isNullable: false
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE user drop email");
    }

}
