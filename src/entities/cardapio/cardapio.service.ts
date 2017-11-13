import { Produto } from '../produto';
import { Restaurante } from "./../restaurante/restaurante.model";
import { Service, Inject } from "typedi";
import { Cardapio } from "./cardapio.model";
import { IServiceBase } from "../base-entity/base-entity.service";
import { Repository, getRepository } from "typeorm";
import { validate } from "class-validator";
import { ResponseData } from "../response-data";
import { List } from "linqts";

@Service()
export class CardapioService implements IServiceBase<Cardapio> {
  private restauranteRepository: Repository<Restaurante>;
  private produtoRepository: Repository<Produto>;
  private repository: Repository<Cardapio>;

  constructor() {
    this.repository = getRepository(Cardapio);
    this.restauranteRepository = getRepository(Restaurante);
    this.produtoRepository = getRepository(Produto);
  }

  async create(props: Cardapio, ...params: any[]): Promise<ResponseData> {
    let idRestaurante = params[0];
    let responseData = new ResponseData();
    return validate(props).then(errors => {
      if (errors.length > 0) {
        errors.forEach(function (val) {
          responseData.mensagens.push(val.value);
        });
        responseData.status = false;
        responseData.objeto = props;
      } else {
        // let restaurante: Restaurante;
        // this.restauranteRepository
        //   .findOneById(idRestaurante)
        //   .then(res => (restaurante = res))
        //   .catch(err => {
        //     responseData.mensagens.push(err);
        //     responseData.status = false;
        //   });

        //verifica se não ocorreu erro ao buscar o restaurante
        if (responseData.mensagens.length == 0) {
          responseData.mensagens.push("OK!");
          // props.restaurante = restaurante;
          responseData.objeto = this.repository.create(props);
        }
      }
      return responseData;
    });
  }

  async readOne(id: number): Promise<Cardapio | ResponseData> {
    let promise = new Promise<Cardapio | ResponseData>((resolve, reject) => {
      resolve(this.repository.findOneById(id));
      let response = new ResponseData();
      response.mensagens.push("id não encontrado.");
      response.status = false;
      reject(response);
    });

    return promise;
  }

  async update(props: Cardapio): Promise<Cardapio> {
    return this.repository.preload(props);
  }

  //funcao modificada
  async drop(id: number): Promise<Cardapio> {
    let cardapio: Cardapio;
    this.readOne(id).then((res: Cardapio) => (cardapio = res));
    return this.repository.remove(cardapio);
  }

  async readAll(): Promise<Cardapio[] | any> {

    let query = await this.repository.find();

    let produtos = [];

    return produtos;
  }
}
