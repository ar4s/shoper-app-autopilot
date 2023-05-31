import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1684430005628 implements MigrationInterface {
  name = "Initial1684430005628";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "image_banner_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isOriginal" boolean NOT NULL DEFAULT false, "width" integer NOT NULL, "height" integer NOT NULL, "type" "public"."image_banner_entity_type_enum" NOT NULL, "totalBytes" integer NOT NULL, "path" character varying NOT NULL, "bucket" character varying NOT NULL, "bannerId" uuid, CONSTRAINT "PK_7b2b3de816a50879be2d2f4ef8a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "banner_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shopId" character varying NOT NULL, "name" character varying(100) NOT NULL, "alternativeText" character varying(150) NOT NULL, "enabled" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "UQ_7ec4d32ea5224550e3b2e56c207" UNIQUE ("name"), CONSTRAINT "PK_00c4108eb12b2cc78aeda3e432e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shop" ("id" character varying NOT NULL, "shopHostname" character varying NOT NULL, "accessToken" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "UQ_438a4ba0c7f454f30f738a6bd63" UNIQUE ("shopHostname"), CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "task_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shopId" character varying NOT NULL, "payload" jsonb, "enabled" boolean NOT NULL DEFAULT true, "draft" boolean NOT NULL DEFAULT true, "triggerAt" TIMESTAMP WITH TIME ZONE NOT NULL, "executed" boolean NOT NULL DEFAULT false, "executedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_0385ca690d1697cdf7ff1ed3c2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_banner_entity" ADD CONSTRAINT "FK_ba27b6e937062295e45ed5ad2a3" FOREIGN KEY ("bannerId") REFERENCES "banner_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "image_banner_entity" DROP CONSTRAINT "FK_ba27b6e937062295e45ed5ad2a3"`,
    );
    await queryRunner.query(`DROP TABLE "task_entity"`);
    await queryRunner.query(`DROP TABLE "shop"`);
    await queryRunner.query(`DROP TABLE "banner_entity"`);
    await queryRunner.query(`DROP TABLE "image_banner_entity"`);
  }
}
