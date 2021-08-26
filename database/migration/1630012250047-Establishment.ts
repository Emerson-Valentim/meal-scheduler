import {MigrationInterface, QueryRunner} from "typeorm";

export class Establishment1630012250047 implements MigrationInterface {
    name = 'Establishment1630012250047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "menu" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "ingredients" character varying NOT NULL, "value" integer NOT NULL, "establishment_id" integer, CONSTRAINT "PK_35b2a8f47d153ff7a41860cceeb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "table" ("id" SERIAL NOT NULL, "identification" integer NOT NULL, "seats" integer NOT NULL, "environment_id" integer, CONSTRAINT "PK_28914b55c485fc2d7a101b1b2a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reservation" ("id" SERIAL NOT NULL, "cpf" character varying NOT NULL, "phone" character varying NOT NULL, "status" character varying NOT NULL, "table_id" integer, "establishment_id" integer, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "definition" jsonb NOT NULL, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "establishment" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "category" character varying NOT NULL, "schedule_id" integer, CONSTRAINT "REL_ecd35bc687c94bd5fb6dfec635" UNIQUE ("schedule_id"), CONSTRAINT "PK_149bd9dc1f2bd4e825a0c474932" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "environment" ("id" SERIAL NOT NULL, "smoking_allowed" boolean NOT NULL, "pets_allowed" boolean NOT NULL, "location" character varying NOT NULL, "description" character varying NOT NULL, "establishment_id" integer, CONSTRAINT "PK_f0ec97d0ac5e0e2f50f7475699f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "cnpj" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "establishment_id" integer, CONSTRAINT "REL_1a5537f95e495e43744181dc35" UNIQUE ("establishment_id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "menu" ADD CONSTRAINT "FK_04c15753d9ec3e9c711b0509f84" FOREIGN KEY ("establishment_id") REFERENCES "establishment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "table" ADD CONSTRAINT "FK_fb2b3285c86a027768118085b64" FOREIGN KEY ("environment_id") REFERENCES "environment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_d3321fc44e70fd7e803491513d6" FOREIGN KEY ("table_id") REFERENCES "table"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_d9e5356e3ec547001902b548b1d" FOREIGN KEY ("establishment_id") REFERENCES "establishment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "establishment" ADD CONSTRAINT "FK_ecd35bc687c94bd5fb6dfec635e" FOREIGN KEY ("schedule_id") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "environment" ADD CONSTRAINT "FK_9859884fd041d216be91b1a6286" FOREIGN KEY ("establishment_id") REFERENCES "establishment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_1a5537f95e495e43744181dc352" FOREIGN KEY ("establishment_id") REFERENCES "establishment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_1a5537f95e495e43744181dc352"`);
        await queryRunner.query(`ALTER TABLE "environment" DROP CONSTRAINT "FK_9859884fd041d216be91b1a6286"`);
        await queryRunner.query(`ALTER TABLE "establishment" DROP CONSTRAINT "FK_ecd35bc687c94bd5fb6dfec635e"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_d9e5356e3ec547001902b548b1d"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_d3321fc44e70fd7e803491513d6"`);
        await queryRunner.query(`ALTER TABLE "table" DROP CONSTRAINT "FK_fb2b3285c86a027768118085b64"`);
        await queryRunner.query(`ALTER TABLE "menu" DROP CONSTRAINT "FK_04c15753d9ec3e9c711b0509f84"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "environment"`);
        await queryRunner.query(`DROP TABLE "establishment"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
        await queryRunner.query(`DROP TABLE "table"`);
        await queryRunner.query(`DROP TABLE "menu"`);
    }

}
