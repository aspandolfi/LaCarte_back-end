import { config } from "./../../config/config";
import { IServiceBase } from "../base-entity";
import { Service } from "typedi";
import { Repository, getRepository } from "typeorm";
import { User } from "./user.model";
import { ResponseData } from "../response-data";
import { validate } from "class-validator";

@Service()
export class UserService implements IServiceBase<User> {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public create(props: User): Promise<User | ResponseData> {
    let response = new ResponseData();
    return validate(props).then(errors => {
      // if (errors.length > 0) {
      //   errors.forEach(function(val) {
      //     response.mensagens.push(val.value);
      //   });
      //   response.status = false;
      //   response.objeto = props;
      // } else {
      //   response.mensagens.push("OK!");
      response.objeto = this.repository.create(props);
      // }
      return response;
    });
  }

  public readOne(id: number): Promise<User | ResponseData> {
    let promise = new Promise<User | ResponseData>((resolve, reject) => {
      resolve(this.repository.findOneById(id));
      let response = new ResponseData();
      response.mensagens.push("Id não encontrado.");
      response.status = false;
      reject(response);
    });
    return promise;
  }

  public readOneByEmail(email: string): Promise<User | ResponseData> {
    let promise = new Promise<User | ResponseData>((resolve, reject) => {
      resolve(this.repository.findOne({ email: email }));
      let response = new ResponseData();
      response.mensagens.push("email não encontrado.");
      response.status = false;
      reject(response);
    });

    return promise;
  }

  public update(props: User): Promise<User> {
    return this.repository.preload(props);
  }

  public drop(id: number): Promise<User> {
    let user: User;
    this.readOne(id).then((res: User) => (user = res));
    return this.repository.remove(user);
  }

  public readAll(): Promise<User[]> {
    return this.repository
      .find();
  }

  findOneByToken(token: string): Promise<User> {
    return this.repository.findOne({ token: token });
  }
}
