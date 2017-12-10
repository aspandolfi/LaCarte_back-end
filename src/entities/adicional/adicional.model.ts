import { ItemPedidoAdicional } from "../pedido-item-adicional/pedido-item-adicional.model";
import { Type } from "class-transformer";
import { ProdutoAdicionais } from "../produto-adicionais/produto-adicionais.model";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base-entity";
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity()
export class Adicional extends BaseEntity<Adicional> {
  
  protected validate(obj: Adicional): string[] {
    let errors: string[] = [];
    if (obj.nome === undefined || obj.nome == null) {
      errors.push("Nome é obrigatório.");
    }
    return errors;
  }

  @Column({
    length: 20
  })
  @IsNotEmpty()
  @IsString()
  public nome: string;

  @OneToMany(
    type => ProdutoAdicionais,
    produtoAdicionais => produtoAdicionais.adicionais
  )
  @Type(() => ProdutoAdicionais)
  public produtosAdicionais: ProdutoAdicionais[];

  @OneToMany(type => ItemPedidoAdicional, i => i.adicional)
  @Type(() => ProdutoAdicionais)
  public itemPedidoAdicionais: ItemPedidoAdicional[];
}
