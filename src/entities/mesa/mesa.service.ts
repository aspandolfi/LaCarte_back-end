import { Restaurante } from "./../restaurante/restaurante.model";
import { Mesa } from "./mesa.model";
import { Service } from "typedi";
import { IServiceBase } from "../base-entity";
import { OrmRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { validate } from "class-validator";
import { ResponseData } from "../response-data";

@Service()
export class MesaService implements IServiceBase<Mesa> {
  @OrmRepository(Mesa) private mesaRepository: Repository<Mesa>;
  @OrmRepository(Restaurante)
  private restauranteRepository: Repository<Restaurante>;

  create(props: Mesa, ...params: any[]): Promise<ResponseData> {
    let idRestaurante = params[0];
    let responseData = new ResponseData();
    return validate(props).then(errors => {
      if (errors.length > 0) {
        errors.forEach(function(val) {
          responseData.mensagens.push(val.value);
        });
        responseData.status = false;
        responseData.objeto = props;
      } else {
        let restaurante: Restaurante;
        this.restauranteRepository
          .findOneById(idRestaurante)
          .then(res => (restaurante = res))
          .catch(err => {
            responseData.mensagens.push(err);
            responseData.status = false;
          });

        //verifica se não ocorreu erro ao buscar o restaurante
        if (responseData.mensagens.length == 0) {
          responseData.mensagens.push("OK!");
          props.restaurante = restaurante;
          responseData.objeto = this.mesaRepository.persist(props);
        }
      }
      return responseData;
    });
  }

  readOne(id: number): Promise<Mesa> {
    let result: any = {};
    try {
      result = this.mesaRepository
        .findOneById(id)
        .then()
        .catch(res => (result = res));
    } catch {
      // console.log(Error);
    }
    return result;
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
  readAll(...params: any[]): Promise<Mesa[]> {
    let idRestaurante = params[0];
    return this.mesaRepository.find({ cardapio: idRestaurante });
  }
}
