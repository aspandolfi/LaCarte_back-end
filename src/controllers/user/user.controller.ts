import { plainToClass } from "class-transformer";
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
import { IUser, User, UserService } from "../../entities/user";
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
  public httpPost(
    @Body({
      required: true
    })
    props: IUser
  ): Promise<any> {
    let user = plainToClass(User, props);
    return this.userService.create(user);
  }

  @Get()
  public httpGetAll(): Promise<User[]> {
    return this.userService.readAll();
  }

  @Get("/:id")
  @UseBefore(compression())
  public httpGet(@Param("id") id: number): Promise<any> {
    //testando criptografia na senha
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(myPlaintextPassword, salt);
    console.log(hash)
    console.log(bcrypt.compareSync(myPlaintextPassword, hash));
    console.log(bcrypt.compareSync(someOtherPlaintextPassword, hash));
    return this.userService.readOne(id);
  }

  @Get("/email/:email")
  public httpGetEmail(@Param("email") email: string): Promise<any> {
    return this.userService.readOneByEmail(email);
  }
}
