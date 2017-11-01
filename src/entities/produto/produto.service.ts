import { TipoProduto } from '../produto-tipo';
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
    return this.repository.findOneById(id);
  }
  readOneByTipo(tipoProduto: number ): Promise<Produto[] | ResponseData> {
    let promise = new Promise<Produto[] | ResponseData>((resolve, reject) => {
      resolve(this.repository.find({ tipoProduto: tipoProduto }));
      var response = new ResponseData();
      response.mensagen.push("Tipo não encontrado.");
      response.status = false;
      reject(response);
    });

    return promise;
  }
  update(props: Produto): Promise<Produto> {
    return this.repository.persist(props);
  }
  drop(id: number): Promise<Boolean> {
    return new Promise((resolve,reject)=>{
      this.readOne(id)
          .then(res => {return resolve(true);})
          .catch(error => {
            return reject(false);
          });
       });
    }

  readAll(): Promise<Produto[]> {
    return this.repository.find();
  }
}
