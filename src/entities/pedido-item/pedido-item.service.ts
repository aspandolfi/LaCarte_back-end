import { ItemPedido } from "./pedido-item.model";
import { Inject, Service } from "typedi";
import { IServiceBase } from "../base-entity/base-entity.service";
import { getRepository, Repository } from "typeorm";
import { ResponseData } from "../response-data";
import { validate } from "class-validator";
import { Pedido, Produto } from "../index";

@Service()
export class ItemPedidoService implements IServiceBase<ItemPedido> {
  @Inject() private response: ResponseData;
  private PedidoRepository: Repository<Pedido>;
  private ProdutoRepository: Repository<Produto>;
  private PedidoItemRepository: Repository<ItemPedido>;

  constructor() {
    this.PedidoRepository = getRepository(Pedido);
    this.ProdutoRepository = getRepository(Produto);
    this.PedidoItemRepository = getRepository(ItemPedido);
  }

  public async create(props: ItemPedido, ...params: any[]): Promise<ItemPedido | ResponseData> {
    let idPedido = params[0];
    let idProduto = params[1];
    let errors = props.validate(props);

    if (errors.length == 0) {
      let dbPedido = await this.PedidoRepository.findOneById(idPedido);
      let dbProduto = await this.ProdutoRepository.findOneById(idProduto);

      if (dbPedido === undefined) {
        this.response.mensagens.push("pedido não encontrado.");
        this.response.status = false;
        return this.response;
      }
      if (dbProduto === undefined) {
        this.response.mensagens.push("produto não encontrado.");
        this.response.status = false;
        return this.response;
      }

      let pedidoItem = await this.PedidoItemRepository.create(props);
      pedidoItem.pedido = dbPedido;
      pedidoItem.produto = dbProduto;
      let result = await this.PedidoItemRepository.save(pedidoItem);

      if (result === undefined) {
        this.response.mensagens.push("Erro ao salvar pedido item no banco de dados.");
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

  public async readOne(id: number): Promise<ItemPedido | ResponseData> {
    let result = await this.PedidoItemRepository.findOneById(id);

    if (result === undefined) {
      this.response.mensagens.push("pedido item não encontrado");
      this.response.status = false;
      return this.response;
    }
    return result;
  }

  public async update(props: ItemPedido): Promise<ItemPedido | ResponseData> {
    let errors = props.validate(props);

    if (errors.length > 0) {
      errors.forEach(val => this.response.mensagens.push(val));
      this.response.status = false;
      return this.response;
    }

    let result = await this.PedidoItemRepository.save(props);

    if (result === undefined) {
      this.response.mensagens.push("Falha ao atualizar pedido item.");
      this.response.status = false;
      return this.response;
    }
    return result;
  }

  public async drop(id: number): Promise<ItemPedido | ResponseData> {
    let query = await this.PedidoItemRepository.findOneById(id);

    if (query === undefined) {
      this.response.mensagens.push("Falha ao excluir: Id não encontrado.");
      this.response.status = false;
      return this.response;
    }

    let result = await this.PedidoItemRepository.remove(query);

    if (result === undefined) {
      this.response.mensagens.push("Falha ao excluir.");
      this.response.status = false;
      return this.response;
    }
    return result;
  }
  
  public async readAll(...params: any[]): Promise<ItemPedido[] | ResponseData> {
    let query = await this.PedidoItemRepository.find();
    if (query === undefined) {
      this.response.mensagens.push("Falha ao buscar pedido item.");
      this.response.status = false;
      return this.response;
    }
    return query;
  }
}
