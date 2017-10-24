"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
class EncryptionService {
    genSalt() {
        return bcrypt_1.genSalt()
            .then((salt) => salt);
    }
    hash(input, salt) {
        return bcrypt_1.hash(input, salt);
    }
    compare(input, salt) {
        return bcrypt_1.compare(input, salt);
    }
}
exports.EncryptionService = EncryptionService;
exports.encryptionService = new EncryptionService();
