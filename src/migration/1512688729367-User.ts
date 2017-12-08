import {MigrationInterface, QueryRunner} from "typeorm";

export class User1512688729367 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."produto_adicionais" DROP "quantidade"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "telefone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "sobrenome" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "token" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."user" ALTER COLUMN "token" DROP NOT NULL`);
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."user" ALTER COLUMN "sobrenome" DROP NOT NULL`);
        await queryRunner.query(`-- TODO: revert ALTER TABLE "public"."user" ALTER COLUMN "telefone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."produto_adicionais" ADD "quantidade" integer(32)`);
    }

}
