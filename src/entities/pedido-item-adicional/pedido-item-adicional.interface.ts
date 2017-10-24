import { ItemPedido } from '../pedido-item';
import { IBaseEntity } from "../base-entity";
import { Adicional } from '../index';

export interface IitemPedidoAdicional extends IBaseEntity {
    uantidade: number;
    itemPedido: ItemPedido;
    adicional: Adicional;
  }