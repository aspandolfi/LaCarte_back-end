import { ItemPedidoAdicional } from '../pedido-item-adicional';
import { ProdutoAdicionais } from '../produto-adicionais';
import { IBaseEntity } from "../../entities/base-entity";

export interface IAdicional extends IBaseEntity {
    nome: string;
    produtosAdicionais: ProdutoAdicionais[];
    itemPedidoAdicionais: ItemPedidoAdicional[];    
}
