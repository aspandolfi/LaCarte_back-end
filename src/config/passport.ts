import * as passport from "passport";
import * as passportJWT from "passport-jwt";
import { UserService, User } from "../entities/user";
import { config } from "../config";
import { Inject } from "typedi";

export default class Auth {
  @Inject() private userService: UserService;

  private ExtractJwt = passportJWT.ExtractJwt;
  private Strategy = passportJWT.Strategy;
  private params = {
    secretOrKey: config.jwt.jwtSecret,
    jwtFromRequest: this.ExtractJwt.fromAuthHeader()
  };

  constructor() {
    const strategy = new this.Strategy(this.params, (payload, done) => {
      let user: User;
      this.userService
        .readOne(payload.id)
        .then((res: User) => {
          if (user) {
            return done(null, {
              id: user.id,
              email: user.email
            });
          } else {
            return done(new Error("usuario nao encontrado"), null);
          }
        })
        .catch(error => done(new Error("usuario nao encontrado"), null));
    });
    passport.use(strategy);
  }

  static initialize(): any {
    return passport.initialize();
  }

  static authenticate(): any {
    return passport.authenticate("jwt", config.jwt.jwtSession);
  }
}
