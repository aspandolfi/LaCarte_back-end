import { ItemPedidoAdicional } from "../pedido-item-adicional/pedido-item-adicional.model";
import { Type } from "class-transformer";
import { ProdutoAdicionais } from "../produto-adicionais/produto-adicionais.model";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base-entity";
import { IsString, IsNotEmpty } from "class-validator";

@Entity()
export class Adicional extends BaseEntity {
  @Column({
    length: 20
  })
  @IsNotEmpty()
  @IsString()
  public nome: string;

  @OneToMany(
    type => type = ProdutoAdicionais,
    produtoAdicionais => produtoAdicionais.adicionais
  )
  @Type(() => ProdutoAdicionais)
  public produtosAdicionais: ProdutoAdicionais[];

  @OneToMany(type => type = ItemPedidoAdicional, i => i.adicional)
  @Type(() => ProdutoAdicionais)
  public itemPedidoAdicionais: ItemPedidoAdicional[];
}
