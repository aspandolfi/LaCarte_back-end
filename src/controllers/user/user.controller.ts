import * as stream from 'stream';
import { plainToClass, classToPlain, deserialize } from "class-transformer";
import {
    Body,
    Get,
    HttpCode,
    JsonController,
    Param,
    Post,
    UseBefore,
    Put
} from "routing-controllers";
import { Inject } from "typedi";
import { IUser, User, UserService, UserLogin } from "../../entities/user";
import { Auth } from '../../config/auth';

let bcrypt = require("bcrypt");
let compression = require("compression");
const saltRounds = 0;
const myPlaintextPassword = "123"; //minha senha
const someOtherPlaintextPassword = '1234'; //senha a ser testada

@JsonController("/user")
export class UserController {
    @Inject() private userService: UserService;

    @Post()
    @HttpCode(201)
    public async httpPost(
        @Body({
            required: true
        })
        props: IUser
        ): Promise<any> {
        const user = plainToClass(User, props);
        const result = await this.userService.create(user);
        return classToPlain(result);
    }

    @Get()
    @UseBefore(Auth.Authorize())
    public async httpGetAll(): Promise<any> {
        const users = await this.userService.readAll();
        return classToPlain(users);
    }

    @Put()
    @UseBefore(Auth.Authorize())
    public async httpPut(
        @Body({
            required: true
        })
        props: IUser
        ): Promise<any> {
        const user = plainToClass(User, props);
        const result = await this.userService.update(user);
        return classToPlain(result);
    }

    @Get("/:id")
    @UseBefore(Auth.Authorize())
    public async httpGet( @Param("id") id: number): Promise<any> {
        return await this.userService.readOne(id);
    }

    @Get("/email/:email")
    @UseBefore(Auth.Authorize())
    public async httpGetEmail( @Param("email") email: string): Promise<any> {
        return await this.userService.readOneByEmail(email);
    }

    @Post("/token")
    public async httpToken(
        @Body({ required: true })
        props: UserLogin
        ): Promise<string> {
        return await this.userService.doLogin(props);
    }
}