import { Strategy, ExtractJwt } from "passport-jwt";
import { use, authenticate, initialize } from "passport";
import { Container } from "typedi";
import { UserService, User } from "../entities/user";
import { config } from "./config";
import { createConnections, useContainer as useContainerTypeOrm } from "typeorm";

export module Auth {
  createConnections().then(() => {
    let userService: UserService = Container.get(UserService);
    use(new Strategy(
      { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: config.jwt.jwtSecret },
      (jwt_payload, done) => {
        userService.readOneToToken(jwt_payload)
          .then((user: User) => {
            return done(null, { id: user.id });
          }, err => {
            return done(err, false);
          })
      }
    ));
  })

  export function Initialize() {
    return initialize();
  }

  export function Authorize() {
    return authenticate("jwt", config.jwt.jwtSession);
  }
}