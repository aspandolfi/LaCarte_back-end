import { Produto } from "../produto";
import { IServiceBase } from "../base-entity";
import { ResponseData } from "../response-data";
import { Repository } from "typeorm";
import { OrmRepository } from "typeorm-typedi-extensions";
import { Service } from "typedi";
import { validate } from "class-validator";

@Service()
export class ProdutoService implements IServiceBase<Produto> {
  @OrmRepository(Produto) private repository: Repository<Produto>;

  create(props: Produto, ...params: any[]): Promise<ResponseData> {
    let responseData = new ResponseData();
    return validate(props).then(errors => {
      if (errors.length > 0) {
        errors.forEach(function(val) {
          responseData.mensagens.push(val.value);
        });
        responseData.objeto = props;
      } else {
        responseData.mensagens.push("OK!");
        responseData.objeto = this.repository.persist(props);
      }
      return responseData;
    });
  }
  readOne(id: number): Promise<Produto> {
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
  update(props: Produto): Promise<Produto> {
    return this.repository.persist(props);
  }
  drop(id: number): Promise<Produto> {
    let result: any = {};
    try {
      result = this.readOne(id)
        .then(res => (result = res))
        .catch(res => (result = res));

      result = this.repository
        .remove(result)
        .then()
        .catch(res => (result = res));
    } catch {
      // console.log(Error);
    }
    return result;
  }
  readAll(...params: any[]): Promise<Produto[]> {
    let idCardapio = params[0];
    return this.repository.find({ cardapio: idCardapio });
  }
}
