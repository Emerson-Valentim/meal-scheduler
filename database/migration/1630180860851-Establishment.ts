/* eslint-disable max-len */
import {MigrationInterface, QueryRunner} from 'typeorm';

export class Establishment1630180860851 implements MigrationInterface {
    name = 'Establishment1630180860851'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."menu_item" DROP CONSTRAINT "FK_09ca0dc4f9971b77beb3e6a15d3"');
      await queryRunner.query('ALTER TABLE "public"."table" DROP CONSTRAINT "FK_fb2b3285c86a027768118085b64"');
      await queryRunner.query('ALTER TABLE "public"."reservation" DROP CONSTRAINT "FK_d3321fc44e70fd7e803491513d6"');
      await queryRunner.query('ALTER TABLE "public"."reservation" DROP CONSTRAINT "FK_d9e5356e3ec547001902b548b1d"');
      await queryRunner.query('ALTER TABLE "public"."establishment" DROP CONSTRAINT "FK_ecd35bc687c94bd5fb6dfec635e"');
      await queryRunner.query('ALTER TABLE "public"."environment" DROP CONSTRAINT "FK_9859884fd041d216be91b1a6286"');
      await queryRunner.query('ALTER TABLE "public"."user" DROP CONSTRAINT "FK_1a5537f95e495e43744181dc352"');
      await queryRunner.query('ALTER TABLE "public"."user" ADD CONSTRAINT "UQ_7734202d9aea21a0f3b0dad1568" UNIQUE ("cnpj")');
      await queryRunner.query('ALTER TABLE "public"."menu_item" ADD CONSTRAINT "FK_09ca0dc4f9971b77beb3e6a15d3" FOREIGN KEY ("establishment_id") REFERENCES "establishment"("id") ON DELETE CASCADE ON UPDATE CASCADE');
      await queryRunner.query('ALTER TABLE "public"."table" ADD CONSTRAINT "FK_fb2b3285c86a027768118085b64" FOREIGN KEY ("environment_id") REFERENCES "environment"("id") ON DELETE CASCADE ON UPDATE CASCADE');
      await queryRunner.query('ALTER TABLE "public"."reservation" ADD CONSTRAINT "FK_d3321fc44e70fd7e803491513d6" FOREIGN KEY ("table_id") REFERENCES "table"("id") ON DELETE CASCADE ON UPDATE CASCADE');
      await queryRunner.query('ALTER TABLE "public"."reservation" ADD CONSTRAINT "FK_d9e5356e3ec547001902b548b1d" FOREIGN KEY ("establishment_id") REFERENCES "establishment"("id") ON DELETE CASCADE ON UPDATE CASCADE');
      await queryRunner.query('ALTER TABLE "public"."establishment" ADD CONSTRAINT "FK_ecd35bc687c94bd5fb6dfec635e" FOREIGN KEY ("schedule_id") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE');
      await queryRunner.query('ALTER TABLE "public"."environment" ADD CONSTRAINT "FK_9859884fd041d216be91b1a6286" FOREIGN KEY ("establishment_id") REFERENCES "establishment"("id") ON DELETE CASCADE ON UPDATE CASCADE');
      await queryRunner.query('ALTER TABLE "public"."user" ADD CONSTRAINT "FK_1a5537f95e495e43744181dc352" FOREIGN KEY ("establishment_id") REFERENCES "establishment"("id") ON DELETE CASCADE ON UPDATE CASCADE');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "public"."user" DROP CONSTRAINT "FK_1a5537f95e495e43744181dc352"');
      await queryRunner.query('ALTER TABLE "public"."environment" DROP CONSTRAINT "FK_9859884fd041d216be91b1a6286"');
      await queryRunner.query('ALTER TABLE "public"."establishment" DROP CONSTRAINT "FK_ecd35bc687c94bd5fb6dfec635e"');
      await queryRunner.query('ALTER TABLE "public"."reservation" DROP CONSTRAINT "FK_d9e5356e3ec547001902b548b1d"');
      await queryRunner.query('ALTER TABLE "public"."reservation" DROP CONSTRAINT "FK_d3321fc44e70fd7e803491513d6"');
      await queryRunner.query('ALTER TABLE "public"."table" DROP CONSTRAINT "FK_fb2b3285c86a027768118085b64"');
      await queryRunner.query('ALTER TABLE "public"."menu_item" DROP CONSTRAINT "FK_09ca0dc4f9971b77beb3e6a15d3"');
      await queryRunner.query('ALTER TABLE "public"."user" DROP CONSTRAINT "UQ_7734202d9aea21a0f3b0dad1568"');
      await queryRunner.query('ALTER TABLE "public"."user" ADD CONSTRAINT "FK_1a5537f95e495e43744181dc352" FOREIGN KEY ("establishment_id") REFERENCES "establishment"("id") ON DELETE CASCADE ON UPDATE CASCADE');
      await queryRunner.query('ALTER TABLE "public"."environment" ADD CONSTRAINT "FK_9859884fd041d216be91b1a6286" FOREIGN KEY ("establishment_id") REFERENCES "establishment"("id") ON DELETE CASCADE ON UPDATE CASCADE');
      await queryRunner.query('ALTER TABLE "public"."establishment" ADD CONSTRAINT "FK_ecd35bc687c94bd5fb6dfec635e" FOREIGN KEY ("schedule_id") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE');
      await queryRunner.query('ALTER TABLE "public"."reservation" ADD CONSTRAINT "FK_d9e5356e3ec547001902b548b1d" FOREIGN KEY ("establishment_id") REFERENCES "establishment"("id") ON DELETE CASCADE ON UPDATE CASCADE');
      await queryRunner.query('ALTER TABLE "public"."reservation" ADD CONSTRAINT "FK_d3321fc44e70fd7e803491513d6" FOREIGN KEY ("table_id") REFERENCES "table"("id") ON DELETE CASCADE ON UPDATE CASCADE');
      await queryRunner.query('ALTER TABLE "public"."table" ADD CONSTRAINT "FK_fb2b3285c86a027768118085b64" FOREIGN KEY ("environment_id") REFERENCES "environment"("id") ON DELETE CASCADE ON UPDATE CASCADE');
      await queryRunner.query('ALTER TABLE "public"."menu_item" ADD CONSTRAINT "FK_09ca0dc4f9971b77beb3e6a15d3" FOREIGN KEY ("establishment_id") REFERENCES "establishment"("id") ON DELETE CASCADE ON UPDATE CASCADE');
    }

}
