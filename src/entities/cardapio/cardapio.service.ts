import { Restaurante } from "./../restaurante/restaurante.model";
import { Service } from "typedi";
import { Cardapio } from "./cardapio.model";
import { IServiceBase } from "../base-entity/base-entity.service";
import { OrmRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { validate } from "class-validator";
import { ResponseData } from "../response-data";

@Service()
export class CardapioService implements IServiceBase<Cardapio> {
  @OrmRepository(Cardapio) repository: Repository<Cardapio>;
  @OrmRepository(Restaurante)
  private restauranteRepository: Repository<Restaurante>;

  public create(props: Cardapio, ...params: any[]): Promise<ResponseData> {
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
          responseData.objeto = this.repository.persist(props);
        }
      }
      return responseData;
    });
  }

  public readOne(id: number): Promise<Cardapio | ResponseData> {
    let promise = new Promise<Cardapio | ResponseData>((resolve, reject) => {
      resolve(this.repository.findOneById(id));
      let response = new ResponseData();
      response.mensagens.push("id não encontrado.");
      response.status = false;
      reject(response);
    });

    return promise;
  }

  public update(props: Cardapio): Promise<Cardapio> {
    return this.repository.persist(props);
  }

  //funcao modificada
  public drop(id: number): Promise<Cardapio> {
    let cardapio: Cardapio;
    this.readOne(id).then((res: Cardapio) => (cardapio = res));
    return this.repository.remove(cardapio);
  }
  public readAll(): Promise<Cardapio[]> {
    return this.repository.find();
  }
}
