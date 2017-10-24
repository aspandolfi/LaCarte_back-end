import { Adicional } from "./../adicional/adicional.model";
import { ItemPedido } from "../pedido-item/pedido-item.model";
import { Pedido } from "../pedido/pedido.model";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../base-entity";
import { IsInt } from "class-validator";
import { Type } from "class-transformer";

@Entity()
export class ItemPedidoAdicional extends BaseEntity {
  @Column({
    type: 'int'
  })
  @IsInt()
  public quantidade: number;

  @ManyToOne(type => type = ItemPedido, itemPedido => itemPedido.adicionais)
  @Type(() => Pedido)
  public itemPedido: ItemPedido;

  @ManyToOne(type => type = Adicional, a => a.itemPedidoAdicionais)
  @Type(() => Adicional)
  public adicional: Adicional;
}
