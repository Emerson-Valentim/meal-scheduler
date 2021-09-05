/* eslint-disable max-len */
import { Migration } from '@mikro-orm/migrations';

export class Migration20210905190006 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "Establishment" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) not null, "category" varchar(255) not null);');

    this.addSql('create table "MenuItem" ("id" serial primary key, "name" varchar(255) not null, "ingredients" varchar(255) not null, "value" int4 not null, "establishment_id" int4 not null);');

    this.addSql('create table "Schedule" ("id" serial primary key, "definition" jsonb not null, "establishment_id" int4 not null);');
    this.addSql('alter table "Schedule" add constraint "Schedule_establishment_id_unique" unique ("establishment_id");');

    this.addSql('create table "User" ("id" serial primary key, "cnpj" varchar(255) not null, "phone" varchar(255) not null, "password" varchar(255) not null, "establishment_id" int4 not null);');
    this.addSql('alter table "User" add constraint "User_establishment_id_unique" unique ("establishment_id");');

    this.addSql('create table "Environment" ("id" serial primary key, "smoking_allowed" bool not null, "pets_allowed" bool not null, "location" varchar(255) not null, "description" varchar(255) not null, "establishment_id" int4 not null);');

    this.addSql('create table "Table" ("id" serial primary key, "identification" int4 not null, "seats" int4 not null, "environment_id" int4 not null);');

    this.addSql('create table "Reservation" ("id" serial primary key, "cpf" varchar(255) not null, "phone" varchar(255) not null, "status" varchar(255) not null, "table_id" int4 not null, "establishment_id" int4 not null, "interval" jsonb not null);');

    this.addSql('alter table "MenuItem" add constraint "MenuItem_establishment_id_foreign" foreign key ("establishment_id") references "Establishment" ("id") on update cascade;');

    this.addSql('alter table "Schedule" add constraint "Schedule_establishment_id_foreign" foreign key ("establishment_id") references "Establishment" ("id") on update cascade;');

    this.addSql('alter table "User" add constraint "User_establishment_id_foreign" foreign key ("establishment_id") references "Establishment" ("id") on update cascade;');

    this.addSql('alter table "Environment" add constraint "Environment_establishment_id_foreign" foreign key ("establishment_id") references "Establishment" ("id") on update cascade;');

    this.addSql('alter table "Table" add constraint "Table_environment_id_foreign" foreign key ("environment_id") references "Environment" ("id") on update cascade;');

    this.addSql('alter table "Reservation" add constraint "Reservation_table_id_foreign" foreign key ("table_id") references "Table" ("id") on update cascade;');
    this.addSql('alter table "Reservation" add constraint "Reservation_establishment_id_foreign" foreign key ("establishment_id") references "Establishment" ("id") on update cascade;');
  }

}
