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

  async create(props: ProdutoAdicionais): Promise<ProdutoAdicionais> {
    return this.repository.create(props);
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

  async update(props: ProdutoAdicionais): Promise<ProdutoAdicionais> {
    return this.repository.preload(props);
  }

  async drop(id: number): Promise<ProdutoAdicionais> {
    let result: any = {};
    try {
      result = this.readOne(id)
        .then(res => (result = res))
        .catch(res => (result = res));

      result = this.repository.remove(result)
        .then()
        .catch(res => (result = res));
    } catch {
      // console.log(Error);
    }
    return result;
  }

  async readAll(): Promise<ProdutoAdicionais[]> {
    return this.repository.find();
  }
}
