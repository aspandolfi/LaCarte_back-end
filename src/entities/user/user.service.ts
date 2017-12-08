import { config } from "./../../config/config";
import { IServiceBase } from "../base-entity";
import { Service } from "typedi";
import { Repository, getRepository } from "typeorm";
import { User } from "./user.model";
import { ResponseData } from "../response-data";
import { validate } from "class-validator";
import { UserLogin } from "./user.login";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";

@Service()
export class UserService implements IServiceBase<User> {
    private repository: Repository<User>;
    private passportUserRepository: Repository<User>;
    private response: ResponseData;

    constructor() {
        this.repository = getRepository(User);
        this.passportUserRepository = getRepository(User, "passport");
        this.response = new ResponseData();
    }

    public async create(props: User): Promise<User | ResponseData> {

        // const errors = await validate(props);

        const errors = this.validate(props);

        if (errors.length == 0) {
            let newUser = await this.repository.create(props);
            newUser.senha = hashSync(props.senha, 0);
            let result = await this.repository.save(newUser);

            if (result === undefined) {
                this.response.mensagens.push("Erro ao salvar usuário no banco de dados.");
                this.response.status = false;
                return this.response;
            }

            let payload = { id: result.id };
            let token = sign(payload, config.jwt.jwtSecret, { algorithm: "HS512", expiresIn: config.jwt.jwtExpiration * 3600 * 24 });
            await this.passportUserRepository.update({ id: result.id }, { token: token });

            this.response.objeto = token;
            this.response.mensagens.push("OK");
        }
        else {
            errors.forEach(val => this.response.mensagens.push(val));
            this.response.status = false;
        }
        return this.response;
    }

    public async readOne(id: number): Promise<User | ResponseData> {
        let result = await this.passportUserRepository.findOneById(id);
        if (result === undefined) {
            this.response.mensagens.push("Id não encontrado.");
            this.response.status = false;
            return this.response;
        }
        return result;
    }

    public async readOneToToken(id: number): Promise<User | ResponseData> {
        let result = await this.passportUserRepository.findOneById(id);
        if (result === undefined) {
            this.response.mensagens.push("Id não encontrado.");
            this.response.status = false;
            return this.response;
        }
        return result;
    }

    public async readOneByEmail(email: string): Promise<User | ResponseData> {
        let result = await this.passportUserRepository.findOne({ email: email });
        if (result === undefined) {
            this.response.mensagens.push("Email não encontrado.");
            this.response.status = false;
            return this.response;
        }
        return result;
    }

    public async update(props: User): Promise<any> {
        let dbUser = await this.repository.findOneById(props.id);

        if (dbUser === undefined) {
            this.response.mensagens.push("Usuário não encontrado.");
            this.response.status = false;
            return this.response;
        }

        dbUser.cpf = props.cpf;
        dbUser.email = props.email;
        dbUser.nome = props.nome;
        dbUser.dataNascimento = props.dataNascimento;
        dbUser.telefone = props.telefone;

        let result = await this.repository.save(dbUser);

        if (result === undefined) {
            this.response.mensagens.push("Falha ao atualizar usuário.");
            this.response.status = false;
            return this.response;
        }
        return result;
    }

    public async drop(id: number): Promise<any> {
        let result = await this.repository.findOneById(id);

        if (result === undefined) {
            this.response.mensagens.push("Usuário não encontrado.");
            this.response.status = false;
            return this.response;
        }
        return await this.repository.remove(result);
    }

    public async readAll(): Promise<User[]> {
        return await this.repository.find();
    }

    public findOneByToken(token: string): Promise<User> {
        return this.repository.findOne({ token: token });
    }

    public async doLogin(userLogin: UserLogin): Promise<any> {
        let dbUser = await this.passportUserRepository.findOne({ email: userLogin.email });
        if (dbUser === undefined) {
            this.response.mensagens.push("Usuário não encontrado.");
            this.response.status = false;
            return this.response;
        }
        if (compareSync(userLogin.senha, dbUser.senha)) {
            let payload = { id: dbUser.id };
            let token = sign(payload, config.jwt.jwtSecret, { algorithm: "HS512", expiresIn: config.jwt.jwtExpiration * 3600 * 24 });
            await this.passportUserRepository.update({ id: dbUser.id }, { token: token });
            this.response.objeto = token;
            return this.response;
        }
        else {
            this.response.mensagens.push("E-mail ou senha inválido.");
            this.response.status = false;
            return this.response;
        }
    }

    private validate(user: User): string[] {
        let errors: string[] = [];
        let emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (user.nome === undefined || user.nome === null) {
            errors.push("Nome é obrigatório.");
        }

        if (user.email === undefined || user.email === null) {
            errors.push("E-mail é obrigatório.");
            return errors;
        }

        if (!user.email.match(emailRegex)) {
            errors.push("E-mail inválido.");
        }
        return errors;
    }
}