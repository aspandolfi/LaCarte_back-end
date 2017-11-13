import { Cliente } from "../cliente/cliente.model";
import { ManyToOne } from "typeorm";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base-entity";
import { Cardapio } from "../cardapio";
import { Mesa } from "../mesa/mesa.model";
import { IsString, IsNotEmpty, IsNumberString, IsUrl } from "class-validator";
import { Exclude, Type } from "class-transformer";

@Entity("restaurantes")
export class Restaurante extends BaseEntity {
  @Column({
    length: 100
  })
  @IsNotEmpty()
  @IsString()
  public nome: string;

  @Column({
    length: 150,
    nullable: true
  })
  @IsNotEmpty()
  @IsString()
  public descricao: string;

  @Column({
    length: 150
  })
  @IsNotEmpty()
  @IsString()
  public endereco: string;

  @Column({
    length: 20
  })
  @IsNumberString()
  public telefone: string;

  @Column({ nullable: true })
  @IsUrl()
  public site: string;

  @Column()
  @Exclude()
  public ativo: boolean;

  @ManyToOne(type => Cliente, c => c.restaurantes, { lazy: true, eager: true })
  @Type(() => Cliente)
  public cliente: Cliente;

  @OneToMany(type => Cardapio, cardapio => cardapio.restaurante)
  @Type(() => Cardapio)
  public cardapios: Cardapio[];

  @OneToMany(type => Mesa, mesa => mesa.restaurante)
  @Type(() => Mesa)
  public mesas: Mesa[];
}
