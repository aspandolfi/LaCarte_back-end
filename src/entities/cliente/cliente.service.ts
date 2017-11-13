import { Cliente } from "../cliente";
import { Service } from "typedi";
import { IServiceBase } from "../base-entity";
import { Repository, getRepository } from "typeorm";
import { validate } from "class-validator";
import { ResponseData } from "../response-data";

@Service()
export class ClienteService implements IServiceBase<Cliente> {
    private repository: Repository<Cliente>;
    private response: ResponseData;

    constructor() {
        this.repository = getRepository(Cliente);
        this.response = new ResponseData();
    }

    async create(props: Cliente, ...params: any[]): Promise<Cliente | ResponseData> {
        let responseData = new ResponseData();
        return validate(props).then(errors => {
            if (errors.length > 0) {
                errors.forEach(function (val) {
                    responseData.mensagens.push(val.value);
                });
                responseData.status = false;
                responseData.objeto = props;
            } else {
                responseData.mensagens.push("OK!");
                responseData.objeto = this.repository.create(props);
            }
            return responseData;
        });
    }
    async readOne(id: number): Promise<Cliente> {
        return await this.repository
            .findOneById(id)
            .catch(err => { return err });
    }
    async update(props: Cliente): Promise<Cliente | ResponseData> {
        const query = await this.readOne(props.id)
            .catch(err => { return err });

        if (query.message) {
            this.response.status = false;
            this.response.mensagens.push("Cliente não encontrado.");
            this.response.objeto = query;
            return this.response;
        }

        let cliente: Cliente = query;
        cliente.nome = props.nome;
        cliente.cnpj = props.cnpj;
        cliente.telefone = props.telefone;

        const result = await this.repository.save(cliente)
            .catch(err => { return err });

        if (result.message) {
            this.response.status = false;
            this.response.mensagens.push("Falha ao atualizar cliente.");
            this.response.objeto = result;
            return this.response;
        }

        return result;
    }
    async drop(id: number): Promise<Cliente> {
        let result: any = {};
        try {
            result = this.readOne(id)
                .then(res => (result = res))
                .catch(res => (result = res));

            result = this.repository
                .remove(result)
                .then()
                .catch(res => (result = res));
        } catch {
            // console.log(Error);
        }
        return result;
    }
    async readAll(): Promise<Cliente[]> {
        let clientes = await this.repository.find();
        return clientes;
    }
    async findOneByToken(token: string): Promise<Cliente> {
        return this.repository.findOne({ token: token });
    }
}
