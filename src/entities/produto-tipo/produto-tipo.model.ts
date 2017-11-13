import { Produto } from './../produto/produto.model';
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base-entity";
import { IsString, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

@Entity("tipos_produto")
export class TipoProduto extends BaseEntity {
  @Column({
    length: 20
  })
  @IsNotEmpty()
  @IsString()
  public nome: string;

  @OneToMany(type => Produto, produtos => produtos.tipoProduto)
  @Type(() => Produto)
  public produtos: Produto[];
}
