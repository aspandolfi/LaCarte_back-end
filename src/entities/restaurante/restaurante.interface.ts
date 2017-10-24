import { IBaseEntity } from "../base-entity";
import { Cliente } from "./../cliente/cliente.model"
import { Cardapio } from "./../cardapio/cardapio.model"
import { Mesa } from "./../mesa/mesa.model"

export interface IRestaurante extends IBaseEntity {
  nome: string;
  descricao: string;
  endereco: string;
  telefone: string;
  site?: string;
  ativo: boolean;
  cliente: Cliente;
  cardapios: Cardapio[];
  mesas: Mesa[];
}
