"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("passport");
const typedi_1 = require("typedi");
const user_1 = require("../entities/user");
const config_1 = require("./config");
let userService = typedi_1.Container.get(user_1.UserService);
passport_1.use(new passport_jwt_1.Strategy({ jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeader(), secretOrKey: config_1.config.jwt.jwtSecret }, (jwt_payload, done) => {
    userService.readOne(jwt_payload)
        .then((user) => {
        return done(null, { id: user.id });
    }, err => {
        return done(err, false);
    });
}));
