import { ProdutoAdicionais } from './produto-adicionais.model';
import { Service } from 'typedi';
import { IServiceBase } from "../base-entity/base-entity.service";
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';

@Service()
export class ProdutoAdicionaisService implements IServiceBase<ProdutoAdicionais> {

  @OrmRepository(ProdutoAdicionais) repository: Repository<ProdutoAdicionais>;

  create(props: ProdutoAdicionais): Promise<ProdutoAdicionais> {
    return this.repository.persist(props);
  }
  readOne(id: number): Promise<ProdutoAdicionais> {
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
  update(props: ProdutoAdicionais): Promise<ProdutoAdicionais> {
    return this.repository.persist(props);
  }
  drop(id: number): Promise<ProdutoAdicionais> {
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
  readAll(): Promise<ProdutoAdicionais[]> {
    return this.repository.find();
  }
}
