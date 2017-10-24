import { Pedido } from './pedido.model';
import { Service } from 'typedi';
import { IServiceBase } from "../base-entity/base-entity.service";
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { ResponseData } from "../response-data";
import { validate } from "class-validator";

@Service()
export class PedidoService implements IServiceBase<Pedido> {

  @OrmRepository(Pedido) repository: Repository<Pedido>;

  public create(props: Pedido, ...params: any[]): Promise<Pedido | ResponseData> {
    let idUser = params[0];
    let response = new ResponseData();
    return validate(props).then(errors => {
      if (errors.length > 0) {
        errors.forEach(function(val) {
          response.mensagens.push(val.value);
        });
        response.status = false;
        response.objeto = props;
      } else {
        response.mensagens.push("OK!");
        props = idUser;
        response.objeto = this.repository.persist(props);
      }
      return response;
    });
  }

  readOne(id: number): Promise<Pedido> {
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
  update(props: Pedido): Promise<Pedido> {
    return this.repository.persist(props);
  }
  drop(id: number): Promise<Pedido> {
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
  readAll(): Promise<Pedido[]> {
    return this.repository.find();
  }
}
