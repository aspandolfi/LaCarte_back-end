import { ProdutoAdicionais } from './produto-adicionais.model';
import { Service } from 'typedi';
import { IServiceBase } from "../base-entity/base-entity.service";
import { Repository, getRepository } from 'typeorm';
import { ResponseData } from '../response-data';

@Service()
export class ProdutoAdicionaisService implements IServiceBase<ProdutoAdicionais> {

  private repository: Repository<ProdutoAdicionais>;
  private response: ResponseData;

  constructor() {
    this.repository = getRepository(ProdutoAdicionais);
    this.response = new ResponseData();
  }

  async create(props: ProdutoAdicionais): Promise<ProdutoAdicionais | ResponseData> {
    let errors = props.validate(props);
    if (errors.length == 0) {
      let adicional = await this.repository.create(props);
      let result = await this.repository.save(adicional);

      if (result === undefined) {
        this.response.mensagens.push("Erro ao salvar adicional no banco de dados.");
        return this.response;
      }

      this.response.objeto = result;
      this.response.mensagens.push("OK");
    }
    else {
      errors.forEach(val => this.response.mensagens.push(val));
      this.response.status = false;
    }
    return this.response;
  }

  async readOne(id: number): Promise<ProdutoAdicionais | ResponseData> {
    let result = await this.repository.findOneById(id);

    if (result === undefined) {
      this.response.mensagens.push("Produto Adicional não encontrado.");
      this.response.status = false;
      return this.response;
    }
    return result;
  }

  async update(props: ProdutoAdicionais): Promise<ProdutoAdicionais | ResponseData> {
    let errors = props.validate(props);

    if (errors.length > 0) {
      errors.forEach(val => this.response.mensagens.push(val));
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

  async drop(id: number): Promise<ProdutoAdicionais | ResponseData> {
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

  async readAll(): Promise<ProdutoAdicionais[] | ResponseData> {
    let query = await this.repository.find();
    if (query === undefined) {
      this.response.mensagens.push("Falha ao buscar tipo do produto.");
      this.response.status = false;
      return this.response;
    }
    return query;
  }
}
