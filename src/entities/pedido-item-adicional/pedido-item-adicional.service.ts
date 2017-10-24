import { ItemPedidoAdicional } from './pedido-item-adicional.model';
import { Service } from 'typedi';
import { IServiceBase } from "../base-entity/base-entity.service";
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { ResponseData } from "../response-data";
import { validate } from "class-validator";

@Service()
export class ItemPedidoAdicionalService implements IServiceBase<ItemPedidoAdicional> {

  @OrmRepository(ItemPedidoAdicional) repository: Repository<ItemPedidoAdicional>;

  public create(props: ItemPedidoAdicional, ...params:any[]): Promise<ItemPedidoAdicional | ResponseData> {
    let idItemPedido = params[0];
    let idAdicional = params[1];
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
        props.adicional = idAdicional;
        props.itemPedido = idItemPedido;
        response.objeto = this.repository.persist(props);
      }
      return response;
    });
  }
  readOne(id: number): Promise<ItemPedidoAdicional> {
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
  update(props: ItemPedidoAdicional): Promise<ItemPedidoAdicional> {
    return this.repository.persist(props);
  }
  drop(id: number): Promise<ItemPedidoAdicional> {
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
  readAll(): Promise<ItemPedidoAdicional[]> {
    return this.repository.find();
  }
}
