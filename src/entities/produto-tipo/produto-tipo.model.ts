import { Produto } from './../produto/produto.model';
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base-entity";
import { IsString, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

@Entity()
export class TipoProduto extends BaseEntity<TipoProduto> {
  public validate(obj: TipoProduto): string[] {
    let errors: string[] = [];

    if (obj.nome === undefined || obj.nome === null) {
      errors.push("Nome é obrigatório.")
    }
    return errors;
  }
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
