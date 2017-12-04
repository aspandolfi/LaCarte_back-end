import { ResponseData } from "./../response-data/response-data.model";
import { TipoProduto } from "./../produto-tipo/produto-tipo.model";
import { Produto } from "../produto";
import { IServiceBase } from "../base-entity";
import { ResponseData } from "../response-data";
import { Repository, getRepository } from "typeorm";
import { Inject, Service } from "typedi";
import { validate } from "class-validator";

@Service()
export class ProdutoService implements IServiceBase<Produto> {
  @Inject() private response: ResponseData;
  private produtoRepository: Repository<Produto>;
  private tipoProdutoRepository: Repository<TipoProduto>;

  constructor() {
    this.produtoRepository = getRepository(Produto);
    this.tipoProdutoRepository = getRepository(TipoProduto);
  }

  public async create(
    props: Produto,
    ...params: any[]
  ): Promise<Produto | ResponseData> {
    let idTipoProduto = params[0];
    let errors = await validate(props);

    if (errors.length == 0) {
      let dbTipo = await this.tipoProdutoRepository.findOneById(idTipoProduto);

      if (dbTipo === undefined) {
        this.response.mensagens.push("tipo não encontrado.");
        this.response.status = false;
        return this.response;
      }

      let restauramte = await this.produtoRepository.create(props);
      restauramte.tipoProduto = dbTipo;
      let result = await this.produtoRepository.save(restauramte);

      if (result === undefined) {
        this.response.mensagens.push(
          "Erro ao salvar produto no banco de dados."
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

  public async readOne(id: number): Promise<Produto | ResponseData> {
    let result = await this.produtoRepository.findOneById(id);

    if (result === undefined) {
      this.response.mensagens.push("produto não encontrado");
      this.response.status = false;
      return this.response;
    }
    return result;
  }

  public async readOneByTipo(
    tipoProduto: number
  ): Promise<Produto[] | ResponseData> {
    let query = await this.produtoRepository.find({
      where: { tipoProduto: tipoProduto }
    });

    return query;
  }
  public async update(props: Produto): Promise<Produto | ResponseData> {
    let errors = await validate(props);

    if (errors.length > 0) {
      errors.forEach(val => this.response.mensagens.push(val.value));
      this.response.status = false;
      return this.response;
    }

    let result = await this.produtoRepository.save(props);

    if (result === undefined) {
      this.response.mensagens.push("Falha ao atualizar produto.");
      this.response.status = false;
      return this.response;
    }
    return result;
  }
  public async drop(id: number): Promise<Produto | ResponseData> {
    let query = await this.produtoRepository.findOneById(id);

    if (query === undefined) {
      this.response.mensagens.push("Falha ao excluir: Id não encontrado.");
      this.response.status = false;
      return this.response;
    }

    let result = await this.produtoRepository.remove(query);

    if (result === undefined) {
      this.response.mensagens.push("Falha ao excluir.");
      this.response.status = false;
      return this.response;
    }
    return result;
  }

  public async readAll(...params: any[]): Promise<Produto[] | ResponseData> {
    let query = await this.produtoRepository.find();
    if (query === undefined) {
      this.response.mensagens.push("Falha ao buscar produto.");
      this.response.status = false;
      return this.response;
    }
    return query;
  }
}
