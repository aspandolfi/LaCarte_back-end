import { Cliente } from "../cliente";
import { Service } from "typedi";
import { IServiceBase } from "../base-entity";
import { OrmRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";
import { validate } from "class-validator";
import { ResponseData } from "../response-data";

@Service()
export class ClienteService implements IServiceBase<Cliente> {
    @OrmRepository(Cliente) private repository: Repository<Cliente>;

    create(props: Cliente, ...params: any[]): Promise<ResponseData> {
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
                responseData.objeto = this.repository.persist(props);
            }
            return responseData;
        });
    }
    readOne(id: number): Promise<ResponseData> {
        let result = new ResponseData();
        return this.repository
            .findOneById(id)
            .then(res => {
                result.objeto = res;
            })
            .catch(res => (result.mensagens = res));

    }
    update(props: Cliente): Promise<Cliente> {
        return this.repository.persist(props);
    }
    drop(id: number): Promise<Cliente> {
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
    readAll(): Promise<Cliente[]> {
        return this.repository.find();
    }
    findOneByToken(token: string): Promise<Cliente> {
        return this.repository.findOne({ token: token });
    }
}
