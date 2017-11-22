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
  private cardapioRepository: Repository<Cardapio>;
  private restauranteRepository: Repository<Restaurante>;
  private produtoRepository: Repository<Produto>;
  private response: ResponseData;

  constructor() {
    this.cardapioRepository = getRepository(Cardapio);
    this.restauranteRepository = getRepository(Restaurante);
    // this.produtoRepository = getRepository(Produto);
    this.response = new ResponseData();
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
          responseData.objeto = this.cardapioRepository.create(props);
        }
      }
      return responseData;
    });
  }

  async readOne(id: number): Promise<Cardapio | ResponseData> {

    let result = await this.cardapioRepository.findOneById(id);

    if (result === undefined) {
      this.response.mensagens.push("Cardápio não encontrado.");
      this.response.status = false
      return this.response;
    }
    return result;
  }

  async update(props: Cardapio): Promise<Cardapio> {
    return this.cardapioRepository.preload(props);
  }

  async drop(id: number): Promise<Cardapio> {
    let cardapio: Cardapio;
    this.readOne(id).then((res: Cardapio) => (cardapio = res));
    return this.cardapioRepository.remove(cardapio);
  }

  async readAll(): Promise<Cardapio[] | any> {
    return await this.cardapioRepository.find();
  }
}
