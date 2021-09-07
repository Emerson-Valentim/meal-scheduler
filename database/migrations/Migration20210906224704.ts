import { Migration } from '@mikro-orm/migrations';

export class Migration20210906224704 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "establishment" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) not null, "category" text check ("category" in (\'pub\', \'restaurant\', \'bakery\', \'candy_store\', \'others\')) not null);');

    this.addSql('create table "menu_item" ("id" serial primary key, "name" varchar(255) not null, "ingredients" varchar(255) not null, "value" int4 not null, "establishment_id" int4 not null);');

    this.addSql('create table "schedule" ("id" serial primary key, "definition" jsonb not null, "establishment_id" int4 not null);');
    this.addSql('alter table "schedule" add constraint "schedule_establishment_id_unique" unique ("establishment_id");');

    this.addSql('create table "user" ("id" serial primary key, "cnpj" varchar(255) not null, "phone" varchar(255) not null, "password" varchar(255) not null, "establishment_id" int4 null);');
    this.addSql('alter table "user" add constraint "user_cnpj_unique" unique ("cnpj");');
    this.addSql('alter table "user" add constraint "user_establishment_id_unique" unique ("establishment_id");');

    this.addSql('create table "environment" ("id" serial primary key, "smoking_allowed" bool not null, "pets_allowed" bool not null, "location" text check ("location" in (\'indoor\', \'outdoor\')) not null, "description" varchar(255) not null, "establishment_id" int4 not null);');

    this.addSql('create table "table" ("id" serial primary key, "identification" int4 not null, "seats" int4 not null, "environment_id" int4 not null);');

    this.addSql('create table "reservation" ("id" serial primary key, "cpf" varchar(255) not null, "phone" varchar(255) not null, "status" text check ("status" in (\'scheduled\', \'canceled\', \'finished\')) not null, "table_id" int4 not null, "establishment_id" int4 not null, "interval" jsonb not null);');

    this.addSql('alter table "menu_item" add constraint "menu_item_establishment_id_foreign" foreign key ("establishment_id") references "establishment" ("id") on update cascade;');

    this.addSql('alter table "schedule" add constraint "schedule_establishment_id_foreign" foreign key ("establishment_id") references "establishment" ("id") on update cascade;');

    this.addSql('alter table "user" add constraint "user_establishment_id_foreign" foreign key ("establishment_id") references "establishment" ("id") on update cascade on delete set null;');

    this.addSql('alter table "environment" add constraint "environment_establishment_id_foreign" foreign key ("establishment_id") references "establishment" ("id") on update cascade;');

    this.addSql('alter table "table" add constraint "table_environment_id_foreign" foreign key ("environment_id") references "environment" ("id") on update cascade;');

    this.addSql('alter table "reservation" add constraint "reservation_table_id_foreign" foreign key ("table_id") references "table" ("id") on update cascade;');
    this.addSql('alter table "reservation" add constraint "reservation_establishment_id_foreign" foreign key ("establishment_id") references "establishment" ("id") on update cascade;');
  }

}
