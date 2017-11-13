import { TipoProduto } from './produto-tipo.model';
import { Service } from 'typedi';
import { IServiceBase } from "../base-entity/base-entity.service";
import { Repository, getRepository } from 'typeorm';

@Service()
export class TipoProdutoService implements IServiceBase<TipoProduto> {

  private repository: Repository<TipoProduto>;

  constructor() {
    this.repository = getRepository(TipoProduto);
  }

  async  create(props: TipoProduto): Promise<TipoProduto> {
    return this.repository.create(props);
  }
  readOne(id: number): Promise<TipoProduto> {
    let result: any = {};
    try {
      result = this.repository
        .findOneById(id)
        .then()
        .catch(res => (result = res));
    } catch {
      // console.log(Error);
    }
    return result;
  }
  update(props: TipoProduto): Promise<TipoProduto> {
    return this.repository.preload(props);
  }
  drop(id: number): Promise<TipoProduto> {
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
  readAll(): Promise<TipoProduto[]> {
    return this.repository.find();
  }
}
