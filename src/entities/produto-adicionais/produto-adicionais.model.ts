import { Adicional } from './../adicional/adicional.model';
import { Produto } from './../produto/produto.model';
import { TipoProduto } from "../produto-tipo";
import { BaseEntity } from "../base-entity";
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsNumber } from "class-validator";
import { Type } from "class-transformer";

@Entity()
export class ProdutoAdicionais extends BaseEntity<ProdutoAdicionais> {
  public validate(obj: ProdutoAdicionais): string[] {
    let errors: string[] = [];

    if (obj.valor === undefined || obj.valor === null) {
      errors.push("Valor é obrigatório.");
    }
    if (obj.produto === undefined || obj.produto === null) {
      errors.push("Produto é obrigatório.");
    }
    return errors;
  }
  
  @Column()
  @IsNumber()
  public valor: number;

  @ManyToOne(type => Produto, produto => produto.produtosAdicionais)
  @Type(() => Produto)
  public produto: Produto;

  @ManyToOne(type => Adicional, adicionais => adicionais.produtosAdicionais, { eager: true })
  @Type(() => TipoProduto)
  public adicionais: Adicional;
}
