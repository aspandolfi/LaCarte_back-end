import { Restaurante } from "../restaurante";
import { Pedido } from '../pedido/pedido.model';
import { Column, Entity, ManyToOne, OneToMany} from 'typeorm';
import { BaseEntity } from "../base-entity";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

@Entity()
export class Mesa extends BaseEntity {
  @Column({
    unique: true
  })
  @IsNotEmpty({ message: "Número não pode ser vazio." })
  @IsNumber({ message: "Deve ser um número do tipo inteiro." })
  public numero: number;

  @Column({
    length: 100
  })
  @IsString()
  public qrcode: string;

  @OneToMany(type => Pedido, pedido => pedido.mesa)
  @Type(() => Pedido)
  public pedidos: Pedido[];

  @ManyToOne(type => Restaurante, restaurante => restaurante.mesas)
  @Type(() => Restaurante)
  public restaurante: Restaurante;
}
