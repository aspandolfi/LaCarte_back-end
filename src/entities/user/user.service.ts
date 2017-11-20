import { config } from "./../../config/config";
import { IServiceBase } from "../base-entity";
import { Service } from "typedi";
import { Repository, getRepository } from "typeorm";
import { User } from "./user.model";
import { ResponseData } from "../response-data";
import { validate } from "class-validator";
import { UserLogin } from "./user.login";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import { serializeUser } from "passport"

@Service()
export class UserService implements IServiceBase<User> {
    private repository: Repository<User>;
    private response: ResponseData;

    constructor() {
        this.repository = getRepository(User);
        this.response = new ResponseData();
    }

    public async create(props: User): Promise<User | ResponseData> {

        const errors = await validate(props);

        if (errors.length == 0) {
            props.senha = hashSync(props.senha, 0);
            let newUser = await this.repository.create(props);
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

    public async doLogin(userLogin: UserLogin): Promise<string> {
        let salt = genSaltSync(0);
        let hash = hashSync(userLogin.senha, salt);

        let dbUser = await this.repository.findOne({ email: userLogin.email });

        if (compareSync(dbUser.senha, hash)) {
            let token = serializeUser((dbUser: User, done) => token = done(null, dbUser.id));
            return token;
        }
    }
}
