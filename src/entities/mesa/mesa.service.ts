import * as console from "console";
import { Restaurante } from "./../restaurante/restaurante.model";
import { Mesa } from "./mesa.model";
import { Service } from "typedi";
import { IServiceBase } from "../base-entity";
import { OrmRepository } from "typeorm-typedi-extensions";
import { Repository, getRepository } from "typeorm";
import { validate } from "class-validator";
import { ResponseData } from "../response-data";

@Service()
export class MesaService implements IServiceBase<Mesa> {
  constructor( @OrmRepository(Mesa) private mesaRepository: Repository<Mesa>) {
    this.restauranteRepository = getRepository(Restaurante, "default");
  }
  private restauranteRepository: Repository<Restaurante>;

  create(props: Mesa, ...params: any[]): Promise<ResponseData> {
    console.log(params[0]);
    let idRestaurante = params[0];
    const responseData = new ResponseData();
    return validate(props).then(errors => {
      if (errors.length > 0) {
        errors.forEach(function (val) {
          responseData.mensagens.push(val.value);
        });
        responseData.status = false;
        responseData.objeto = props;
      } else {
        let restaurante: Restaurante;
        this.restauranteRepository
          .findOneById(idRestaurante)
          .then(res => {
            restaurante = res;
            props.restaurante = restaurante;
            this.mesaRepository.persist(props).then(res2 => (responseData.objeto = res2))
          })
          .catch(err => {
            responseData.mensagens.push(err);
            responseData.status = false;
          })
        // if (responseData.mensagens.length == 0) {
        //   responseData.mensagens.push("OK!");
        //   props.restaurante = restaurante;
        //   console.log(restaurante.id);
        //   responseData.objeto = this.mesaRepository.persist(props);
        // }
      }
      return responseData;
    });
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
