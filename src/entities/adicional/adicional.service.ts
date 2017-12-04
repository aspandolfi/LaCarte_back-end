import { Adicional } from "./adicional.model";
import { Inject, Service } from "typedi";
import { IServiceBase } from "../base-entity/base-entity.service";
import { Repository, getRepository } from "typeorm";
import { validate } from "class-validator";
import { ResponseData } from "../response-data";

@Service()
export class AdicionalService implements IServiceBase<Adicional> {
  @Inject() private response: ResponseData;
  private repository: Repository<Adicional>;

  constructor() {
    this.repository = getRepository(Adicional);
  }

  public async create(
    props: Adicional,
    ...params: any[]
  ): Promise<Adicional | ResponseData> {
    let errors = await validate(props);

    if (errors.length == 0) {
      let restauramte = await this.repository.create(props);
      let result = await this.repository.save(restauramte);

      if (result === undefined) {
        this.response.mensagens.push(
          "Erro ao salvar adicional no banco de dados."
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

  public async readOne(id: number): Promise<Adicional | ResponseData> {
    let result = await this.repository.findOneById(id);

    if (result === undefined) {
      this.response.mensagens.push("tipo não encontrado");
      this.response.status = false;
      return this.response;
    }
    return result;
  }
  public async update(props: Adicional): Promise<Adicional | ResponseData> {
    let errors = await validate(props);

    if (errors.length > 0) {
      errors.forEach(val => this.response.mensagens.push(val.value));
      this.response.status = false;
      return this.response;
    }
    let result = await this.repository.save(props);

    if (result === undefined) {
      this.response.mensagens.push("Falha ao atualizar adicional.");
      this.response.status = false;
      return this.response;
    }
    return result;
  }
  public async drop(id: number): Promise<Adicional | ResponseData> {
    let tipo = await this.repository.findOneById(id);

    if (tipo === undefined) {
      this.response.mensagens.push("Falha ao excluir: Id não encontrado.");
      this.response.status = false;
      return this.response;
    }

    let result = await this.repository.remove(tipo);

    if (result === undefined) {
      this.response.mensagens.push("Falha ao excluir.");
      this.response.status = false;
      return this.response;
    }
    return result;
  }
  public async readAll(): Promise<Adicional[] | ResponseData> {
    let query = await this.repository.find();
    if (query === undefined) {
      this.response.mensagens.push("Falha ao buscar tipo.");
      this.response.status = false;
      return this.response;
    }
    return query;
  }
}
