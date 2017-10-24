import { Cliente } from "../cliente/cliente.model";
import { ManyToOne } from "typeorm";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base-entity";
import { Cardapio } from "../cardapio";
import { Mesa } from "../mesa/mesa.model";
import { IsString, IsNotEmpty, IsNumberString, IsUrl } from "class-validator";
import { Exclude, Type } from "class-transformer";

@Entity()
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

  @ManyToOne(type => type = Cliente, c => c.restaurantes)
  @Type(() => Cliente)
  public cliente: Cliente;

  @OneToMany(type => type = Cardapio, cardapio => cardapio.restaurante, {
    lazy: true
  })
  @Type(() => Cardapio)
  public cardapios: Cardapio[];

  @OneToMany(type => type = Mesa, mesa => mesa.restaurante, {
    lazy: true
  })
  @Type(() => Mesa)
  public mesas: Mesa[];
}
