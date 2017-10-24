import { Mesa } from './../mesa/mesa.model';
import { ItemPedido } from "./../pedido-item/pedido-item.model";
import { User } from "../user/user.model";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base-entity";
import { IsNumber, IsBoolean } from "class-validator";
import { Type } from "class-transformer";

@Entity()
export class Pedido extends BaseEntity {
  @Column({
    nullable: true,
    precision: 10
  })
  @IsNumber({ message: "Deve ser um número do tipo inteiro." })
  public valorTotal: number;

  @Column({
    default: false
  })
  @IsBoolean()
  public fechado: boolean;

  @ManyToOne(type => type = User, user => user.pedidos)
  @Type(() => User)
  public user: User;

  @ManyToOne(type => type = Mesa, mesa => mesa.pedidos)
  @Type(() => Mesa)
  public mesa: Mesa;

  @OneToMany(type => type = ItemPedido, item => item.pedido)
  @Type(() => ItemPedido)
  public itens: ItemPedido[];
}
