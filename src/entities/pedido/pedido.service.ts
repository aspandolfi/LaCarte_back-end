import { Pedido } from './pedido.model';
import { Service } from 'typedi';
import { IServiceBase } from "../base-entity/base-entity.service";
import { Repository, getRepository } from 'typeorm';
import { ResponseData } from "../response-data";
import { validate } from "class-validator";
import { User, Mesa } from '../index';

@Service()
export class PedidoService implements IServiceBase<Pedido> {
  private repository: Repository<Pedido>;

  constructor() {
    this.repository = getRepository(Pedido);
  }

  public create(props: Pedido, ...params: any[]): Promise<Pedido | ResponseData> {
    let idUser = params[0];
    let response = new ResponseData();
    return validate(props).then(errors => {
      if (errors.length > 0) {
        errors.forEach(function (val) {
          response.mensagens.push(val.value);
        });
        response.status = false;
        response.objeto = props;
      } else {
        response.mensagens.push("OK!");
        response.objeto = this.repository.create(props);
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
    return this.repository.preload(props);
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
