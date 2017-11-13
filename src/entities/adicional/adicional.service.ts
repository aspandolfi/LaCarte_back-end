import { Adicional } from './adicional.model';
import { Service } from 'typedi';
import { IServiceBase } from "../base-entity/base-entity.service";
import { Repository, getRepository } from 'typeorm';
import { validate } from "class-validator";
import { ResponseData } from "../response-data";

@Service()
export class AdicionalService implements IServiceBase<Adicional> {
  private repository: Repository<Adicional>;

  constructor() {
    this.repository = getRepository(Adicional);
  }

  public create(props: Adicional): Promise<Adicional | ResponseData> {
    let response = new ResponseData();
    return validate(props).then(errors => {
      if (errors.length > 0) {
        errors.forEach(function (val) {
          response.mensagens.push(val.value);
        });
        response.status = false;
        response.objeto = props;
      } else {
        response.mensagens.push("OK!");
        response.objeto = this.repository.create(props);
      }
      return response;
    });
  }

  readOne(id: number): Promise<Adicional> {
    let result: any = {};
    try {
      result = this.repository
        .findOneById(id)
        .then()
        .catch(res => (result = res));
    } catch {
      // console.log(Error);
    }
    return result;
  }
  update(props: Adicional): Promise<Adicional> {
    return this.repository.preload(props);
  }
  drop(id: number): Promise<Adicional> {
    let result: any = {};
    try {
      result = this.readOne(id)
        .then(res => (result = res))
        .catch(res => (result = res));

      result = this.repository.remove(result)
        .then()
        .catch(res => (result = res));
    } catch {
      // console.log(Error);
    }
    return result;
  }
  readAll(): Promise<Adicional[]> {
    return this.repository.find();
  }
}
