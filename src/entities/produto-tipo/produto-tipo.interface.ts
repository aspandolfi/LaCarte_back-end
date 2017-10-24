import { IBaseEntity } from "../base-entity";
import { Produto } from "./../produto/produto.model"

export interface ITipoProduto extends IBaseEntity {
    nome: string;
    produtos: Produto[];
}