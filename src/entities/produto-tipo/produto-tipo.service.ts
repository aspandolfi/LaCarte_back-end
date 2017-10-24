import { TipoProduto } from './produto-tipo.model';
import { Service } from 'typedi';
import { IServiceBase } from "../base-entity/base-entity.service";
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';

@Service()
export class TipoProdutoService implements IServiceBase<TipoProduto> {

  @OrmRepository(TipoProduto) repository: Repository<TipoProduto>;

  create(props: TipoProduto): Promise<TipoProduto> {
    return this.repository.persist(props);
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
    return this.repository.persist(props);
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
