import { ItemPedido } from '../pedido-item';
import { Mesa } from '../mesa';
import { User } from '../user';
import { IBaseEntity } from "../base-entity";

export interface IPedido extends IBaseEntity {
  valorTotal: number;
  fechado: boolean;
  user: User;
  mesa: Mesa;
  itens: ItemPedido[];
}
