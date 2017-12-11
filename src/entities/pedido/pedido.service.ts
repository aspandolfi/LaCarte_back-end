import { Service } from 'typedi';
import { Repository, getRepository } from 'typeorm';
import { validate } from "class-validator";
import { User } from '../user';
import { Mesa } from '../mesa';
import { Pedido } from './pedido.model';
import { ResponseData } from "../response-data";
import { IServiceBase } from "../base-entity/base-entity.service";

@Service()
export class PedidoService implements IServiceBase<Pedido> {
  private repository: Repository<Pedido>;
  private response: ResponseData;

  constructor() {
    this.repository = getRepository(Pedido);
    this.response = new ResponseData();
  }

  async create(props: Pedido, ...params: any[]): Promise<Pedido | ResponseData> {
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

  async readOne(id: number): Promise<Pedido> {
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

  async update(props: Pedido): Promise<Pedido> {
    return this.repository.preload(props);
  }

  async drop(id: number): Promise<Pedido> {
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

  async readAll(): Promise<Pedido[] | ResponseData> {
    return this.repository.find();
  }
}
