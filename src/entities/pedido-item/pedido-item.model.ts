import { ItemPedidoAdicional } from "../pedido-item-adicional/pedido-item-adicional.model";
import { Produto } from "../produto/produto.model";
import { Pedido } from "../pedido/pedido.model";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base-entity";
import { IsNumber, IsInt } from "class-validator";
import { Type } from "class-transformer";

@Entity()
export class ItemPedido extends BaseEntity {
  @Column({
    type: 'int'
  })
  @IsInt()
  public quantidade: number;

  @Column({
    nullable: true
  })
  @IsNumber()
  public valorDesconto: number;

  @ManyToOne(type => type = Pedido, p => p.itens)
  @Type(() => Pedido)
  public pedido: Pedido;

  @ManyToOne(type => type = Produto, produto => produto.itensPedido)
  @Type(() => Produto)
  public produto: Produto;

  @OneToMany(type => type = ItemPedidoAdicional, i => i.itemPedido)
  @Type(() => ItemPedidoAdicional)
  public adicionais: ItemPedidoAdicional[];
}
