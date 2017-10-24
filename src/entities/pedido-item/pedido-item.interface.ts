import { ItemPedidoAdicional } from '../pedido-item-adicional';
import { Produto } from "./../produto/produto.model";
import { Pedido } from "./../pedido/pedido.model"

export interface IitemPedido {
  quantidade: number;
  valorDesconto: number;
  produto: Produto;
  pedido: Pedido;
  adicionais: ItemPedidoAdicional[];
}
