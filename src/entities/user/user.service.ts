import { config } from "./../../config/config";
import { IServiceBase } from "../base-entity";
import { Service } from "typedi";
import { Repository, getRepository } from "typeorm";
import { User } from "./user.model";
import { ResponseData } from "../response-data";
import { validate } from "class-validator";
import { UserLogin } from "./user.login";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import { encode } from "jwt-simple";
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

        const errors = await validate(props);

        if (errors.length == 0) {
            let newUser = await this.repository.create(props);
            newUser.senha = hashSync(props.senha, 0);
            let result = await this.repository.save(newUser);

            if (result === undefined) {
                this.response.mensagens.push("Erro ao salvar usuário no banco de dados.");
                this.response.status = false;
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

    public readOne(id: number): Promise<User | ResponseData> {
        let promise = new Promise<User | ResponseData>((resolve, reject) => {
            resolve(this.repository.findOneById(id));
            let response = new ResponseData();
            response.mensagens.push("Id não encontrado.");
            response.status = false;
            reject(response);
        });
        return promise;
    }

    public async readOneToToken(id: number): Promise<User | ResponseData> {
        let result = await this.passportUserRepository.findOneById(id);
        if (result === undefined) {
            this.response.mensagens.push("Id não encontrado.");
            this.response.status = false;
        }
        return result;
    }

    public readOneByEmail(email: string): Promise<User | ResponseData> {
        let promise = new Promise<User | ResponseData>((resolve, reject) => {
            resolve(this.repository.findOne({ email: email }));
            let response = new ResponseData();
            response.mensagens.push("email não encontrado.");
            response.status = false;
            reject(response);
        });

        return promise;
    }

    public update(props: User): Promise<User> {
        return this.repository.preload(props);
    }

    public drop(id: number): Promise<User> {
        let user: User;
        this.readOne(id).then((res: User) => (user = res));
        return this.repository.remove(user);
    }

    public readAll(): Promise<User[]> {
        return this.repository
            .find();
    }

    public findOneByToken(token: string): Promise<User> {
        return this.repository.findOne({ token: token });
    }

    public async doLogin(userLogin: UserLogin): Promise<any> {

        let dbUser = await this.passportUserRepository.findOne({ email: userLogin.email });

        if (dbUser === undefined) {
            return "Usuário não encontrado.";
        }

        if (compareSync(userLogin.senha, dbUser.senha)) {
            let payload = { id: dbUser.id };
            // let token = encode(payload, config.jwt.jwtSecret);
            let token = sign(payload, config.jwt.jwtSecret, { algorithm: "HS512", expiresIn: config.jwt.jwtExpiration * 3600 * 24 });
            return token;
        }
        else {
            return "E-mail ou senha inválido.";
        }
    }
}