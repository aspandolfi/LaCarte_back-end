import * as stream from 'stream';
import { plainToClass, classToPlain, deserialize } from "class-transformer";
import {
    Body,
    Get,
    HttpCode,
    JsonController,
    Param,
    Post,
    UseBefore
} from "routing-controllers";
import { Inject } from "typedi";
import { IUser, User, UserService, UserLogin } from "../../entities/user";
// import Auth from "../../config/passport";


let bcrypt = require("bcrypt");
let compression = require("compression");
const saltRounds = 0;
const myPlaintextPassword = "123"; //minha senha
const someOtherPlaintextPassword = '1234'; //senha a ser testada

// @UseBefore(() => Auth.authenticate())
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
    public async httpGetAll(): Promise<any> {
        const users = await this.userService.readAll();

        return classToPlain(users);
    }

    @Get("/:id")
    @UseBefore(compression())
    public httpGet( @Param("id") id: number): Promise<any> {
        //testando criptografia na senha
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(myPlaintextPassword, salt);
        console.log(hash)
        console.log(bcrypt.compareSync(myPlaintextPassword, hash));
        console.log(bcrypt.compareSync(someOtherPlaintextPassword, hash));
        return this.userService.readOne(id);
    }

    @Get("/email/:email")
    public httpGetEmail( @Param("email") email: string): Promise<any> {
        return this.userService.readOneByEmail(email);
    }

    @Post("/token")
    public async httpToken(
        @Body({ required: true })
        props: UserLogin
        ): Promise<string> {
        return await this.userService.doLogin(props);
    }
}
