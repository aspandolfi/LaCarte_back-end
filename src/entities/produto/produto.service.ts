import { TipoProduto } from '../produto-tipo';
import { Produto } from "../produto";
import { IServiceBase } from "../base-entity";
import { ResponseData } from "../response-data";
import { Repository, getRepository } from "typeorm";
import { Service } from "typedi";
import { validate } from "class-validator";

@Service()
export class ProdutoService implements IServiceBase<Produto> {
  private repository: Repository<Produto>;

  constructor() {
    this.repository = getRepository(Produto);
  }

  create(props: Produto, ...params: any[]): Promise<ResponseData> {
    let responseData = new ResponseData();
    return validate(props).then(errors => {
      if (errors.length > 0) {
        errors.forEach(function (val) {
          responseData.mensagens.push(val.value);
        });
        responseData.objeto = props;
      } else {
        responseData.mensagens.push("OK!");
        responseData.objeto = this.repository.create(props);
      }
      return responseData;
    });
  }

  readOne(id: number): Promise<Produto> {
    return this.repository.findOneById(id);
  }

  async readOneByTipo(tipoProduto: number): Promise<Produto[] | ResponseData> {
    let query = await this.repository.find({ where: { tipoProduto: tipoProduto } });

    return query;
  }
  update(props: Produto): Promise<Produto> {
    return this.repository.preload(props);
  }
  drop(id: number): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.readOne(id)
        .then(res => { return resolve(true); })
        .catch(error => {
          return reject(false);
        });
    });
  }

  readAll(): Promise<Produto[]> {
    return this.repository.find();
  }
}
