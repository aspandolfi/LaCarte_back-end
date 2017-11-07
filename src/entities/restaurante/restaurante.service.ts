import { Restaurante } from "./restaurante.model";
import { Cliente } from "../cliente";
import { ResponseData } from "../response-data";
import { IServiceBase } from "../base-entity";
import { Service } from "typedi";
import { OrmRepository } from "typeorm-typedi-extensions";
import { Repository, getRepository } from "typeorm";
import { validate } from "class-validator";

@Service()
export class RestauranteService implements IServiceBase<Restaurante> {
  private response: ResponseData;
  private clienteRepository: Repository<Cliente>;

  constructor( @OrmRepository(Restaurante) private restauranteRepository: Repository<Restaurante>) {
    this.clienteRepository = getRepository(Cliente, "default");
    this.response = new ResponseData();
  }

  async create(props: Restaurante, ...params: any[]): Promise<ResponseData> {
    let idCliente = params[0];

    let errors = await validate(props);

    if (errors.length == 0) {
      let dbCliente = await this.clienteRepository.findOneById(idCliente);

      if (dbCliente === undefined) {
        this.response.mensagens.push("Cliente não encontrado.");
        this.response.status = false;
        return this.response;
      }

      props.cliente = dbCliente;
      let result = await this.restauranteRepository.persist(props);

      if (result === undefined) {
        this.response.mensagens.push("Erro ao salvar restaurante no banco de dados.");   
        return this.response;
      }

      this.response.objeto = result;
      this.response.mensagens.push("OK");
    }
    else {
      errors.forEach(val => this.response.mensagens.push(val.value));
      this.response.status = false;
    }
    return this.response;
  }

  async readOne(id: number): Promise<Restaurante | ResponseData> {
    let result = await this.restauranteRepository.findOneById(id);

    if (result === undefined) {
      this.response.mensagens.push("Objeto não encontrado");
      this.response.status = false
      return this.response;
    }

    return result;
  }

  async update(props: Restaurante): Promise<Restaurante | ResponseData> {
    try {
      return await this.restauranteRepository.persist(props);
    }
    catch (e) {
      this.response.status = false
      this.response.mensagens.push(e);
    }
    return this.response;
  }

  async drop(id: number): Promise<Restaurante> {
    let result: any = {};
    try {
      result = this.readOne(id)
        .then(res => (result = res))
        .catch(res => (result = res));

      result = this.restauranteRepository
        .remove(result)
        .then()
        .catch(res => (result = res));
    } catch {
      // console.log(Error);
    }
    return result;
  }
  readAll(...params: any[]): Promise<Restaurante[]> {
    return this.restauranteRepository.find();
  }
}
