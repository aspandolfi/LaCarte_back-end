import { Restaurante } from "./restaurante.model";
import { Cliente } from "../cliente";
import { ResponseData } from "../response-data";
import { IServiceBase } from "../base-entity";
import { Service, Inject } from "typedi";
import { Repository, getRepository } from "typeorm";
import { validate } from "class-validator";

@Service()
export class RestauranteService implements IServiceBase<Restaurante> {
    @Inject() private response: ResponseData;
    private clienteRepository: Repository<Cliente>;
    private restauranteRepository: Repository<Restaurante>;

    constructor() {
        this.restauranteRepository = getRepository(Restaurante)
        this.clienteRepository = getRepository(Cliente);
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

            let restauramte = await this.restauranteRepository.create(props);
            restauramte.cliente = dbCliente;
            let result = await this.restauranteRepository.save(restauramte);

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
            this.response.mensagens.push("Restaurante não encontrado");
            this.response.status = false
            return this.response;
        }
        return result;
    }

    async update(props: Restaurante): Promise<Restaurante | ResponseData> {
        let errors = await validate(props);

        if (errors.length > 0) {
            errors.forEach(val => this.response.mensagens.push(val.value));
            this.response.status = false;
            return this.response;
        }

        let result = await this.restauranteRepository.save(props);

        if (result === undefined) {
            this.response.mensagens.push("Falha ao atualizar Restaurante.");
            this.response.status = false
            return this.response;
        }
        return result;
    }

    async drop(id: number): Promise<Restaurante | ResponseData> {
        let restauramte = await this.restauranteRepository.findOneById(id);

        if (restauramte === undefined) {
            this.response.mensagens.push("Falha ao excluir: Id não encontrado.");
            this.response.status = false;
            return this.response;
        }

        let result = await this.restauranteRepository.remove(restauramte);

        if (result === undefined) {
            this.response.mensagens.push("Falha ao excluir.");
            this.response.status = false;
            return this.response;
        }
        return result;
    }

    async readAll(...params: any[]): Promise<Restaurante[] | ResponseData> {

        let query = await this.restauranteRepository.find();
        if (query === undefined) {
            this.response.mensagens.push("Falha ao buscar restaurantes.");
            this.response.status = false;
            return this.response;
        }
        return query;
    }
}
