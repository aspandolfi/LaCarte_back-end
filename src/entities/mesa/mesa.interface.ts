import { Restaurante } from '../restaurante';
import { IBaseEntity } from "../base-entity";
import { Pedido } from "./../pedido/pedido.model"

export interface IMesa extends IBaseEntity {
    numero: number;
    qrcode: string;
    // ativo: boolean;
    pedidos: Pedido[];
    restaurante: Restaurante;
}
