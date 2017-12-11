import { Adicional } from "./../adicional/adicional.model";
import { ItemPedido } from "./../pedido-item/pedido-item.model";
import { ItemPedidoAdicional } from "./pedido-item-adicional.model";
import { Inject, Service } from "typedi";
import { IServiceBase } from "../base-entity/base-entity.service";
import { Repository, getRepository } from "typeorm";
import { ResponseData } from "../response-data";
import { validate } from "class-validator";

@Service()
export class ItemPedidoAdicionalService implements IServiceBase<ItemPedidoAdicional> {
  @Inject() private response: ResponseData;
  private itemPedidoAdicionalRepository: Repository<ItemPedidoAdicional>;
  private itemPedidoRepository: Repository<ItemPedido>;
  private adicionalRepository: Repository<Adicional>;

  constructor() {
    this.itemPedidoAdicionalRepository = getRepository(ItemPedidoAdicional);
    this.itemPedidoRepository = getRepository(ItemPedido);
    this.adicionalRepository = getRepository(Adicional);
  }

  public async create(props: ItemPedidoAdicional, ...params: any[]): Promise<ItemPedidoAdicional | ResponseData> {
    let idItemPedido = params[0];
    let idAdicional = params[1];
    let errors = props.validate(props);

    if (errors.length == 0) {
      let dbItemPedido = await this.itemPedidoRepository.findOneById(
        idItemPedido
      );
      let dbAdicional = await this.adicionalRepository.findOneById(idAdicional);

      if (dbItemPedido === undefined) {
        this.response.mensagens.push("pedido item não encontrado.");
        this.response.status = false;
        return this.response;
      }
      if (dbAdicional === undefined) {
        this.response.mensagens.push("adicional não encontrado.");
        this.response.status = false;
        return this.response;
      }

      let itemPedido = await this.itemPedidoAdicionalRepository.create(props);
      itemPedido.itemPedido = dbItemPedido;
      itemPedido.adicional = dbAdicional;
      let result = await this.itemPedidoAdicionalRepository.save(itemPedido);

      if (result === undefined) {
        this.response.mensagens.push("Erro ao pedido item adicional no banco de dados.");
        return this.response;
      }

      this.response.objeto = result;
      this.response.mensagens.push("OK");
    } else {
      errors.forEach(val => this.response.mensagens.push(val));
      this.response.status = false;
    }
    return this.response;
  }

  public async readOne(id: number): Promise<ItemPedidoAdicional | ResponseData> {
    let result = await this.itemPedidoAdicionalRepository.findOneById(id);

    if (result === undefined) {
      this.response.mensagens.push("pedido item adicional não encontrado");
      this.response.status = false;
      return this.response;
    }
    return result;
  }

  public async update(props: ItemPedidoAdicional): Promise<ItemPedidoAdicional | ResponseData> {
    let errors = props.validate(props);

    if (errors.length > 0) {
      errors.forEach(val => this.response.mensagens.push(val));
      this.response.status = false;
      return this.response;
    }

    let result = await this.itemPedidoAdicionalRepository.save(props);

    if (result === undefined) {
      this.response.mensagens.push("Falha ao atualizar pedido item adicional.");
      this.response.status = false;
      return this.response;
    }
    return result;
  }
  public async drop(id: number): Promise<ItemPedidoAdicional | ResponseData> {
    let query = await this.itemPedidoAdicionalRepository.findOneById(id);

    if (query === undefined) {
      this.response.mensagens.push("Falha ao excluir: Id não encontrado.");
      this.response.status = false;
      return this.response;
    }

    let result = await this.itemPedidoAdicionalRepository.remove(query);

    if (result === undefined) {
      this.response.mensagens.push("Falha ao excluir.");
      this.response.status = false;
      return this.response;
    }
    return result;
  }
  
  public async readAll(...params: any[]): Promise<ItemPedidoAdicional[] | ResponseData> {
    let query = await this.itemPedidoAdicionalRepository.find();
    if (query === undefined) {
      this.response.mensagens.push("Falha ao buscar pedido item adicional.");
      this.response.status = false;
      return this.response;
    }
    return query;
  }
}
