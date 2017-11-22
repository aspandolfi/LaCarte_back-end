import { Pedido } from "./../pedido/pedido.model";
import { BaseEntity } from "../base-entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Type, Exclude } from "class-transformer";
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
    @IsDate({ message: 'Data de Nascimento Inválida.' })
    dataNascimento?: Date;

    @Column({ unique: true })
    @IsNotEmpty({ message: 'E-mail não pode estar em branco.' })
    @IsEmail(null, { message: 'E-mail inválido.' })
    email: string;

    @Column({
        unique: true,
        length: 11
    })
    @Length(11, 11)
    @IsNumberString({ message: 'CPF inválido.' })
    cpf: string;

    @Column({ type: 'varchar', length: 128 })
    @IsNotEmpty({ message: 'Senha não pode estar em branco.' })
    @Exclude({ toPlainOnly: true })
    senha: string;

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
    @IsNotEmpty({ message: 'Nome não pode estar em branco.' })
    @IsString()
    nome: string;

    @Column()
    @IsOptional()
    @IsString()
    token: string;

    @OneToMany(type => Pedido, pedido => pedido.user)
    @Type(() => Pedido)
    public pedidos: Pedido[];
}
