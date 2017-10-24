import { Produto } from './../produto/produto.model';
import { Column, Entity, ManyToOne, ManyToMany } from "typeorm";
import { BaseEntity } from "../base-entity";
import { Restaurante } from "../restaurante";
import { IsString, IsNotEmpty } from "class-validator";

@Entity("cardapios")
export class Cardapio extends BaseEntity {
  @Column({
    length: 50
  })
  @IsNotEmpty()
  @IsString()
  public nome: string;

  @Column({
    length: 250,
    nullable: true
  })
  @IsNotEmpty()
  @IsString()
  public descricao: string;

  @Column({
    default: true
  }) public ativo: boolean;

  @ManyToOne(type => (type = Restaurante), restaurante => restaurante.cardapios)
  public restaurante: Restaurante;

  @ManyToMany(type => (type = Produto), produtos => produtos.cardapios, {
    lazy: true
  })
  public produtos: Produto[];
}
