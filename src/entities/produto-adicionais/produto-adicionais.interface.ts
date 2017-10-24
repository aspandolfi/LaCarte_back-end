import { IBaseEntity } from "../base-entity";
import { Produto } from "./../produto/produto.model"
import { Adicional } from "./../adicional/adicional.model"

export interface IProdutoAdicionais extends IBaseEntity {
    valor: number;
    produto: Produto;
    adicionais: Adicional;
}
