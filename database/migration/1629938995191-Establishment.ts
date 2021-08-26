import {MigrationInterface, QueryRunner} from "typeorm";

export class Establishment1629938995191 implements MigrationInterface {
    name = 'Establishment1629938995191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "menu" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "ingredients" character varying NOT NULL, "value" integer NOT NULL, "establishment_id" integer, CONSTRAINT "PK_35b2a8f47d153ff7a41860cceeb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "table" ("id" SERIAL NOT NULL, "identification" integer NOT NULL, "seats" integer NOT NULL, "establishment_id" integer, CONSTRAINT "PK_28914b55c485fc2d7a101b1b2a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "establishment" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "category" character varying NOT NULL, CONSTRAINT "PK_149bd9dc1f2bd4e825a0c474932" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "environment" ("id" SERIAL NOT NULL, "smoking_allowed" boolean NOT NULL, "pets_allowed" boolean NOT NULL, "location" character varying NOT NULL, "description" character varying NOT NULL, "establishment_id" integer, CONSTRAINT "PK_f0ec97d0ac5e0e2f50f7475699f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "menu" ADD CONSTRAINT "FK_04c15753d9ec3e9c711b0509f84" FOREIGN KEY ("establishment_id") REFERENCES "establishment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "table" ADD CONSTRAINT "FK_c9075c4ba510eeb552eaa927a9f" FOREIGN KEY ("establishment_id") REFERENCES "establishment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "environment" ADD CONSTRAINT "FK_9859884fd041d216be91b1a6286" FOREIGN KEY ("establishment_id") REFERENCES "establishment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "environment" DROP CONSTRAINT "FK_9859884fd041d216be91b1a6286"`);
        await queryRunner.query(`ALTER TABLE "table" DROP CONSTRAINT "FK_c9075c4ba510eeb552eaa927a9f"`);
        await queryRunner.query(`ALTER TABLE "menu" DROP CONSTRAINT "FK_04c15753d9ec3e9c711b0509f84"`);
        await queryRunner.query(`DROP TABLE "environment"`);
        await queryRunner.query(`DROP TABLE "establishment"`);
        await queryRunner.query(`DROP TABLE "table"`);
        await queryRunner.query(`DROP TABLE "menu"`);
    }

}
