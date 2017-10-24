import { ItemPedido } from "../pedido-item/pedido-item.model";
import { ProdutoAdicionais } from "../produto-adicionais/produto-adicionais.model";
import { Cardapio } from "../cardapio";
import { TipoProduto } from "../produto-tipo";
import { BaseEntity } from "../base-entity";
import {
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany
} from "typeorm";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { Exclude, Type } from "class-transformer";

@Entity()
export class Produto extends BaseEntity {
  @Column({
    length: 50
  })
  @IsNotEmpty()
  @IsString()
  public nome: string;

  @Column({
    length: 100,
    nullable: true
  })
  @IsOptional()
  @IsString()
  public descricao: string;

  @Column()
  @IsNumber()
  public valor: number;

  @Column({
    length: 256
  })
  @IsUrl()
  public urlImagem: string;

  @Column({
    default: true
  })
  @Exclude()
  public ativo: boolean;

  @ManyToMany(type => Cardapio)
  @JoinTable()
  public cardapios: Cardapio[];

  @ManyToOne(type => (type = TipoProduto), tipoProduto => tipoProduto.produtos)
  @Type(() => TipoProduto)
  public tipoProduto: TipoProduto;

  @OneToMany(
    type => (type = ProdutoAdicionais),
    produtoAdicionais => produtoAdicionais.produto
  )
  @Type(() => ProdutoAdicionais)
  public produtosAdicionais: ProdutoAdicionais[];

  @OneToMany(type => (type = ItemPedido), itemPedido => itemPedido.produto)
  @Type(() => ItemPedido)
  public itensPedido: ItemPedido[];
}
