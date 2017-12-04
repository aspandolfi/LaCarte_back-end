import { Produto } from "../produto";
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
  private response: ResponseData;

  constructor() {
    this.cardapioRepository = getRepository(Cardapio);
    this.restauranteRepository = getRepository(Restaurante);
    this.response = new ResponseData();
  }

  public async create(
    props: Cardapio,
    ...params: any[]
  ): Promise<Cardapio | ResponseData> {
    let idRestaurante = params[0];
    let errors = await validate(props);

    if (errors.length == 0) {
      let dbRestaurante = await this.restauranteRepository.findOneById(
        idRestaurante
      );

      if (dbRestaurante === undefined) {
        this.response.mensagens.push("restaurante não encontrado.");
        this.response.status = false;
        return this.response;
      }

      let cardapio = await this.cardapioRepository.create(props);
      cardapio.restaurante = dbRestaurante;
      let result = await this.cardapioRepository.save(cardapio);

      if (result === undefined) {
        this.response.mensagens.push(
          "Erro ao salvar cardapio no banco de dados."
        );
        return this.response;
      }

      this.response.objeto = result;
      this.response.mensagens.push("OK");
    } else {
      errors.forEach(val => this.response.mensagens.push(val.value));
      this.response.status = false;
    }
    return this.response;
  }

  public async readOne(id: number): Promise<Cardapio | ResponseData> {
    let result = await this.cardapioRepository.findOneById(id);

    if (result === undefined) {
      this.response.mensagens.push("cardapio não encontrado");
      this.response.status = false;
      return this.response;
    }
    return result;
  }

  public async update(props: Cardapio): Promise<Cardapio | ResponseData> {
    let errors = await validate(props);

    if (errors.length > 0) {
      errors.forEach(val => this.response.mensagens.push(val.value));
      this.response.status = false;
      return this.response;
    }

    let result = await this.cardapioRepository.save(props);

    if (result === undefined) {
      this.response.mensagens.push("Falha ao atualizar cardapio.");
      this.response.status = false;
      return this.response;
    }
    return result;
  }

  public async drop(id: number): Promise<Cardapio | ResponseData> {
    let cardapio = await this.cardapioRepository.findOneById(id);

    if (cardapio === undefined) {
      this.response.mensagens.push("Falha ao excluir: Id não encontrado.");
      this.response.status = false;
      return this.response;
    }

    let result = await this.cardapioRepository.remove(cardapio);

    if (result === undefined) {
      this.response.mensagens.push("Falha ao excluir.");
      this.response.status = false;
      return this.response;
    }
    return result;
  }

  public async readAll(): Promise<Cardapio[] | ResponseData> {
    let query = await this.cardapioRepository.find();
    if (query === undefined) {
      this.response.mensagens.push("Falha ao buscar cardapios.");
      this.response.status = false;
      return this.response;
    }
    return query;
  }
}
