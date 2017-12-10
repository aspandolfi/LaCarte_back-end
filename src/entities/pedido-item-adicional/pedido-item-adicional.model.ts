import { Adicional } from "./../adicional/adicional.model";
import { ItemPedido } from "../pedido-item/pedido-item.model";
import { Pedido } from "../pedido/pedido.model";
import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../base-entity";
import { IsInt } from "class-validator";
import { Type } from "class-transformer";

@Entity()
export class ItemPedidoAdicional extends BaseEntity<ItemPedidoAdicional> {
  public validate(obj: ItemPedidoAdicional): string[] {
    let errors: string[] = [];
    if (obj.quantidade === undefined || obj.quantidade == null) {
      errors.push("Quantidade é obrigatório.");
    }
    if (obj.itemPedido === undefined || obj.itemPedido == null) {
      errors.push("Item Pedido é obrigatório.");
    }
    if (obj.adicional === undefined || obj.adicional == null) {
      errors.push("Adicional é obrigatório.");
    }
    return errors;
  }
  
  @Column({
    type: 'int'
  })
  @IsInt()
  public quantidade: number;

  @ManyToOne(type => ItemPedido, itemPedido => itemPedido.adicionais)
  @Type(() => Pedido)
  public itemPedido: ItemPedido;

  @ManyToOne(type => Adicional, a => a.itemPedidoAdicionais)
  @Type(() => Adicional)
  public adicional: Adicional;
}
