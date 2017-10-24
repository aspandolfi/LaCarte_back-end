import { IBaseEntity } from "../../entities/base-entity";
import { Pedido } from "./../pedido/pedido.model"

export interface IUser extends IBaseEntity {
  dataNascimento?: Date;
  email: string;
  cpf: string;
  senha: string;
  telefone: string;
  sobrenome?: string;
  nome: string;
  token: string;
  tokenFacebook: string;
  pedidos: Pedido[];
}

