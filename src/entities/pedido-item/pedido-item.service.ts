import { ItemPedido } from "./pedido-item.model";
import { Service } from "typedi";
import { IServiceBase } from "../base-entity/base-entity.service";
import { OrmRepository } from "typeorm-typedi-extensions";
import { getRepository, Repository } from 'typeorm';
import { ResponseData } from "../response-data";
import { validate } from "class-validator";
import { Pedido, Produto } from "../index";

@Service()
export class ItemPedidoService implements IServiceBase<ItemPedido> {
  constructor(@OrmRepository(ItemPedido) private repository: Repository<ItemPedido>){
    this.PedidoRepository = getRepository(Pedido,"Default");
    this.ProdutoRepository = getRepository(Produto,"Default");
  }
  private PedidoRepository: Repository <Pedido>;
  private ProdutoRepository: Repository <Produto>;

  create(props: ItemPedido, ...params: any[]): Promise<ItemPedido | ResponseData> {
    let idPedido = params[0];
    let idProduto = params[1];
    let responseData = new ResponseData();
    return validate(props).then(errors => {
      if (errors.length > 0) {
        errors.forEach(function(val) {
          responseData.mensagens.push(val.value);
        });
        responseData.status = false;
        responseData.objeto = props;
      } else {
        responseData.mensagens.push("OK!");
        responseData.objeto = this.repository.persist(props);
      }
      return responseData;
    });
  }

  readOne(id: number): Promise<ItemPedido> {
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
  update(props: ItemPedido): Promise<ItemPedido> {
    return this.repository.persist(props);
  }
  drop(id: number): Promise<ItemPedido> {
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
  readAll(): Promise<ItemPedido[]> {
    return this.repository.find();
  }
}
