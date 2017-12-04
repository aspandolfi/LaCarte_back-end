import * as console from "console";
import { Restaurante } from "./../restaurante/restaurante.model";
import { Mesa } from "./mesa.model";
import { Inject, Service } from "typedi";
import { IServiceBase } from "../base-entity";
import { Repository, getRepository } from "typeorm";
import { validate } from "class-validator";
import { ResponseData } from "../response-data";

@Service()
export class MesaService implements IServiceBase<Mesa> {
  @Inject() private response: ResponseData;
  private restauranteRepository: Repository<Restaurante>;
  private mesaRepository: Repository<Mesa>;

  constructor() {
    this.mesaRepository = getRepository(Mesa);
    this.restauranteRepository = getRepository(Restaurante);
  }

  public async create(
    props: Mesa,
    ...params: any[]
  ): Promise<Mesa | ResponseData> {
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

      let mesa = await this.mesaRepository.create(props);
      mesa.restaurante = dbRestaurante;
      let result = await this.mesaRepository.save(mesa);

      if (result === undefined) {
        this.response.mensagens.push("Erro ao salvar mesa no banco de dados.");
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

  public async readOne(id: number): Promise<Mesa | ResponseData> {
    let result = await this.mesaRepository.findOneById(id);

    if (result === undefined) {
      this.response.mensagens.push("mesa não encontrado");
      this.response.status = false;
      return this.response;
    }
    return result;
  }
  public async update(props: Mesa): Promise<Mesa | ResponseData> {
    let errors = await validate(props);

    if (errors.length > 0) {
      errors.forEach(val => this.response.mensagens.push(val.value));
      this.response.status = false;
      return this.response;
    }

    let result = await this.mesaRepository.save(props);

    if (result === undefined) {
      this.response.mensagens.push("Falha ao atualizar mesa.");
      this.response.status = false;
      return this.response;
    }
    return result;
  }
  public async drop(id: number): Promise<Mesa | ResponseData> {
    let mesa = await this.mesaRepository.findOneById(id);

    if (mesa === undefined) {
      this.response.mensagens.push("Falha ao excluir: Id não encontrado.");
      this.response.status = false;
      return this.response;
    }

    let result = await this.mesaRepository.remove(mesa);

    if (result === undefined) {
      this.response.mensagens.push("Falha ao excluir.");
      this.response.status = false;
      return this.response;
    }
    return result;
  }
  public async readAll(): Promise<Mesa[] | ResponseData> {
    let query = await this.mesaRepository.find();
    if (query === undefined) {
        this.response.mensagens.push("Falha ao buscar mesa.");
        this.response.status = false;
        return this.response;
    }
    return query;
  }
}
