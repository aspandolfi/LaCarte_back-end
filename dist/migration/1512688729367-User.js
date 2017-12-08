"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class User1512688729367 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "public"."produto_adicionais" DROP "quantidade"`);
            yield queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "telefone" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "sobrenome" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "token" DROP NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`-- TODO: revert ALTER TABLE "public"."user" ALTER COLUMN "token" DROP NOT NULL`);
            yield queryRunner.query(`-- TODO: revert ALTER TABLE "public"."user" ALTER COLUMN "sobrenome" DROP NOT NULL`);
            yield queryRunner.query(`-- TODO: revert ALTER TABLE "public"."user" ALTER COLUMN "telefone" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "public"."produto_adicionais" ADD "quantidade" integer(32)`);
        });
    }
}
exports.User1512688729367 = User1512688729367;
