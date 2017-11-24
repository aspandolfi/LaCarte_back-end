import { Cliente } from "../cliente";
import { Service } from "typedi";
import { IServiceBase } from "../base-entity";
import { Repository, getRepository } from "typeorm";
import { validate } from "class-validator";
import { ResponseData } from "../response-data";
import { hashSync } from "bcrypt";

@Service()
export class ClienteService implements IServiceBase<Cliente> {
    private clienteRepository: Repository<Cliente>;
    private response: ResponseData;

    constructor() {
        this.clienteRepository = getRepository(Cliente);
        this.response = new ResponseData();
    }

    async create(props: Cliente, ...params: any[]): Promise<Cliente | ResponseData> {

        let cliente = await this.clienteRepository.create(props);
        let errors = await validate(cliente);

        if (errors.length == 0) {
            cliente.senha = hashSync(cliente.senha, 0);

            let result = await this.clienteRepository.save(cliente);
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

    async readOne(id: number): Promise<Cliente | any> {
        const query = await this.clienteRepository.findOneById(id)
            .catch(err => { return err });

        if (query === undefined) {
            this.response.status = false;
            this.response.mensagens.push("Cliente não encontrado.");
            this.response.objeto = query;
            return this.response;
        }

        return query;
    }

    async update(props: Cliente): Promise<Cliente | ResponseData> {
        const query = await this.readOne(props.id)
            .catch(err => { return err });

        if (query.mensagens.length > 0) {
            this.response.status = false;
            this.response.mensagens.push("Cliente não encontrado.");
            this.response.objeto = query;
            return this.response;
        }

        let cliente: Cliente = query;
        cliente.nome = props.nome;
        cliente.cnpj = props.cnpj;
        cliente.telefone = props.telefone;

        const result = await this.clienteRepository.save(cliente)
            .catch(err => { return err });

        if (result.message) {
            this.response.status = false;
            this.response.mensagens.push("Falha ao atualizar cliente.");
            this.response.objeto = result;
            return this.response;
        }

        return result;
    }

    async drop(id: number): Promise<Cliente | any> {
        let dbCliente = await this.clienteRepository.findOneById(id);

        if (dbCliente) {
            await this.clienteRepository.removeById(id);
            return dbCliente;
        }
        else {
            this.response.mensagens.push("Falha ao remover cliente.");
            this.response.status = false;
            this.response.objeto = id;
            return this.response;
        }
    }

    async readAll(): Promise<Cliente[]> {
        let clientes = await this.clienteRepository.find();
        return clientes;
    }

    async findOneByToken(token: string): Promise<Cliente> {
        return this.clienteRepository.findOne({ token: token });
    }
}
