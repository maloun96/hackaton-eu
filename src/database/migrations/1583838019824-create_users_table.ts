import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsersTable1583838019824 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.query(`
            CREATE TABLE users
            (
                id INT NOT NULL AUTO_INCREMENT,
                name     VARCHAR(255) NULL,
                email    VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                PRIMARY KEY (id),
                UNIQUE INDEX test_UNIQUE (name ASC),
                UNIQUE INDEX email_UNIQUE (email ASC)
            );

        `)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return queryRunner.query(`
                DROP TABLE users
        `)
    }

}
