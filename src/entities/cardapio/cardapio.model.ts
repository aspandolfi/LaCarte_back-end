import { Produto } from './../produto/produto.model';
import { Column, Entity, ManyToOne, ManyToMany, RelationId } from "typeorm";
import { BaseEntity } from "../base-entity";
import { Restaurante } from "../restaurante";
import { IsString, IsNotEmpty } from "class-validator";

@Entity()
export class Cardapio extends BaseEntity<Cardapio> {

  public validate(obj: Cardapio): string[] {
    let errors: string[] = [];
    if (obj.restaurante === undefined || obj.restaurante == null) {
      errors.push("Restaurante é obrigatório.");
    }
    if (obj.nome === undefined || obj.nome == null) {
      errors.push("Nome é obrigatório.");
    }
    return errors;
  }
  @Column({
    length: 50
  })
  @IsNotEmpty()
  @IsString()
  public nome: string;

  @Column({
    length: 250,
    nullable: true
  })
  @IsNotEmpty()
  @IsString()
  public descricao: string;

  @Column({
    default: true
  }) public ativo: boolean;

  @ManyToOne(type => Restaurante, restaurante => restaurante.cardapios)
  public restaurante: Restaurante;

  @ManyToMany(type => Produto, produtos => produtos.cardapios)
  public produtos: Produto[];
}
