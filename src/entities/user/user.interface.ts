import { IBaseEntity } from "../../entities/base-entity";
import { Pedido } from "./../pedido/pedido.model"

export interface IUser extends IBaseEntity {
    dataNascimento?: Date;
    email: string;
    cpf: string;
    telefone: string;
    sobrenome?: string;
    nome: string;
    token: string;
    pedidos: Pedido[];
}

