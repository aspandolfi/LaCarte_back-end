"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("passport");
const typedi_1 = require("typedi");
const user_1 = require("../entities/user");
const config_1 = require("./config");
const typeorm_1 = require("typeorm");
var Auth;
(function (Auth) {
    typeorm_1.useContainer(typedi_1.Container);
    typeorm_1.createConnections().then(() => {
        let userService = typedi_1.Container.get(user_1.UserService);
        passport_1.use(new passport_jwt_1.Strategy({ jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: config_1.config.jwt.jwtSecret }, (jwt_payload, done) => {
            userService.readOneToToken(jwt_payload)
                .then((user) => {
                return done(null, { id: user.id });
            }, err => {
                return done(err, false);
            });
        }));
    });
    function Initialize() {
        return passport_1.initialize();
    }
    Auth.Initialize = Initialize;
    function Authorize() {
        return passport_1.authenticate("jwt", config_1.config.jwt.jwtSession);
    }
    Auth.Authorize = Authorize;
})(Auth = exports.Auth || (exports.Auth = {}));
