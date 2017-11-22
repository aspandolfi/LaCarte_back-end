import { ItemPedidoAdicional } from "../pedido-item-adicional/pedido-item-adicional.model";
import { Produto } from "../produto/produto.model";
import { Pedido } from "../pedido/pedido.model";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base-entity";
import { IsNumber, IsInt, IsString, IsEnum } from "class-validator";
import { Type } from "class-transformer";

enum Status {
  Pendente,
  Confirmado,
  Recusado
}

@Entity("itens_pedido")
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

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true
  })
  @IsString()
  public observacao: string;

  @Column({
    type: 'int',
    default: 1
  })
  @IsEnum(Status)
  public status: Status;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true
  })
  public respostaCozinha: string;

  @ManyToOne(type => Pedido, p => p.itens)
  @Type(() => Pedido)
  public pedido: Pedido;

  @ManyToOne(type => Produto, produto => produto.itensPedido)
  @Type(() => Produto)
  public produto: Produto;

  @OneToMany(type => ItemPedidoAdicional, i => i.itemPedido)
  @Type(() => ItemPedidoAdicional)
  public adicionais: ItemPedidoAdicional[];
}

