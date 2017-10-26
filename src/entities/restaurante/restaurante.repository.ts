import { Restaurante } from './restaurante.model';
import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import {  OrmRepository } from 'typeorm-typedi-extensions';

@Service()
export class RestauranteRepository{
  @OrmRepository(Restaurante)
  private repository: Repository<Restaurante>;

  public readAll(): Promise<Restaurante[]>{
    return this.repository.find();
  }
}
