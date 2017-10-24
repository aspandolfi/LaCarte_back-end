import { ItemPedido } from '../pedido-item';
import { ProdutoAdicionais } from '../produto-adicionais';
import { TipoProduto } from '../produto-tipo';
import { IBaseEntity } from "../base-entity";
import { Cardapio } from "./../cardapio/cardapio.model"

export interface IProduto extends IBaseEntity {
    nome: string;
    descricao: string;
    valor: number;
    urlImagem: string;
    ativo: boolean;
    cardapios: Cardapio[];
    tipoProduto: TipoProduto;
    produtosAdicionais: ProdutoAdicionais[];
    itensPedido: ItemPedido[];

}
