import { ResponseData } from "./../response-data/response-data.model";
import { TipoProduto } from "./produto-tipo.model";
import { Service, Inject } from "typedi";
import { IServiceBase } from "../base-entity/base-entity.service";
import { Repository, getRepository } from "typeorm";
import { validate } from "class-validator";

@Service()
export class TipoProdutoService implements IServiceBase<TipoProduto> {
  @Inject() private response: ResponseData;
  private repository: Repository<TipoProduto>;

  constructor() {
    this.repository = getRepository(TipoProduto);
  }

  public async create(
    props: TipoProduto,
    ...params: any[]
  ): Promise<TipoProduto | ResponseData> {
    let errors = await validate(props);

    if (errors.length == 0) {
      let restauramte = await this.repository.create(props);
      let result = await this.repository.save(restauramte);

      if (result === undefined) {
        this.response.mensagens.push("Erro ao salvar tipo no banco de dados.");
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

  public async readOne(id: number): Promise<TipoProduto | ResponseData> {
    let result = await this.repository.findOneById(id);

    if (result === undefined) {
      this.response.mensagens.push("tipo não encontrado");
      this.response.status = false;
      return this.response;
    }
    return result;
  }

  public async update(props: TipoProduto): Promise<TipoProduto | ResponseData> {
    let errors = await validate(props);

    if (errors.length > 0) {
      errors.forEach(val => this.response.mensagens.push(val.value));
      this.response.status = false;
      return this.response;
    }
    let result = await this.repository.save(props);

    if (result === undefined) {
      this.response.mensagens.push("Falha ao atualizar tipo.");
      this.response.status = false;
      return this.response;
    }
    return result;
  }

  public async drop(id: number): Promise<TipoProduto | ResponseData> {
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

  public async readAll(): Promise<TipoProduto[] | ResponseData> {
    let query = await this.repository.find();
    if (query === undefined) {
      this.response.mensagens.push("Falha ao buscar tipo.");
      this.response.status = false;
      return this.response;
    }
    return query;
  }
}
