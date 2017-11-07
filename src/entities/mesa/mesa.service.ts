import * as console from "console";
import { Restaurante } from "./../restaurante/restaurante.model";
import { Mesa } from "./mesa.model";
import { Service } from "typedi";
import { IServiceBase } from "../base-entity";
import { OrmRepository } from "typeorm-typedi-extensions";
import { Repository, getRepository } from "typeorm";
import { validate } from "class-validator";
import { ResponseData } from "../response-data";
import { User } from "../user";

@Service()
export class MesaService implements IServiceBase<Mesa> {
  private restauranteRepository: Repository<Restaurante>;
  private userRepository: Repository<User>;

  constructor( @OrmRepository(Mesa) private mesaRepository: Repository<Mesa>) {
    this.restauranteRepository = getRepository(Restaurante, "default");
    this.userRepository = getRepository(User, "default");
  }

  async create(props: Mesa, ...params: any[]): Promise<ResponseData> {
    console.log(params[0]);
    let idRestaurante = params[0];
    const responseData = new ResponseData();

    let errors = await validate(props);

    if (errors.length == 0) {
      let restaurante = await this.restauranteRepository.findOneById(idRestaurante);
      if (restaurante) {
        props.restaurante = restaurante;
        let result = await this.mesaRepository.persist(props)
          .then(res => {
            return res;
          })
          .catch(err => {
            return err
          });

        if (result.message) {
          responseData.mensagens.push(result.message);
        }
        else {
          responseData.mensagens.push("OK");
        }

      }
      else {
        errors.forEach(val => responseData.mensagens.push(val.value));
        responseData.status = false;
      }
      return responseData;
    }
  }

  readOne(id: number): Promise<Mesa> {
    return this.mesaRepository.findOneById(id);
  }
  update(props: Mesa): Promise<Mesa> {
    return this.mesaRepository.persist(props);
  }
  drop(id: number): Promise<Mesa> {
    let result: any = {};
    try {
      result = this.readOne(id)
        .then(res => (result = res))
        .catch(res => (result = res));

      result = this.mesaRepository
        .remove(result)
        .then()
        .catch(res => (result = res));
    } catch {
      // console.log(Error);
    }
    return result;
  }
  readAll(): Promise<Mesa[]> {
    return this.mesaRepository.find();
  }
}
