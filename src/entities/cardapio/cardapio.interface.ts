import { Produto } from '../produto';
import { Restaurante } from '../restaurante';
import { IBaseEntity } from "../base-entity";

export interface ICardapio extends IBaseEntity {
  nome: string;
  descricao: string;
  ativo: boolean;
  restaurante: Restaurante;
  produtos: Produto[];
}
