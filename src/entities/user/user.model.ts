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
export class User extends BaseEntity<User> {

    public validate(obj: User): string[] {
        let errors: string[] = [];
        let emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (obj.nome === undefined || obj.nome === null) {
            errors.push("Nome é obrigatório.");
        }

        if (obj.email === undefined || obj.email === null) {
            errors.push("E-mail é obrigatório.");
        }
        else {
            if (!obj.email.match(emailRegex)) {
                errors.push("E-mail inválido.");
            }
        }

        if (obj.cpf.length > 11) {
            errors.push("CPF inválido.");
        }
        else {
            try {
                parseInt(obj.cpf);
            } catch (error) {
                errors.push("CPF deve conter apenas números.");
            }
        }
        return errors;
    }

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

    @Column({ nullable: true })
    @IsNumberString()
    telefone: string;

    @Column({
        length: 100,
        nullable: true
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

    @Column({
        nullable: true
    })
    @IsOptional()
    @IsString()
    token: string;

    @OneToMany(type => Pedido, pedido => pedido.user)
    @Type(() => Pedido)
    public pedidos: Pedido[];
}
