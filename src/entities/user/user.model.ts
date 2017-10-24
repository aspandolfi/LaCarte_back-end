import { Type } from "class-transformer";
import { Pedido } from "./../pedido/pedido.model";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base-entity";
import {
  Length,
  IsEmail,
  IsDate,
  IsNumberString,
  IsString,
  IsNotEmpty,
  IsOptional
} from "class-validator";

@Entity()
export class User extends BaseEntity {
  @Column({
    nullable: true
  })
  @IsOptional()
  @IsDate()
  dataNascimento?: Date;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({
    unique: true,
    length: 11
  })
  @Length(11, 11)
  @IsNumberString()
  cpf: string;

  @Column() senha: string;

  @Column()
  @IsNumberString()
  telefone: string;

  @Column({
    length: 100
  })
  @IsOptional()
  @IsString()
  sobrenome?: string;

  @Column({
    length: 20
  })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @Column()
  @IsOptional()
  @IsString()
  token: string;

  @Column()
  @IsOptional()
  @IsString()
  tokenFacebook: string;

  @OneToMany(() => Pedido, pedido => pedido.user)
  @Type(() => Pedido)
  public pedidos: Pedido[];
}
