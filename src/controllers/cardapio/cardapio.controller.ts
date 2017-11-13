import * as stream from 'stream';
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
import { ICardapio, Cardapio, CardapioService } from "../../entities/cardapio";
// import Auth from "../../config/passport";


let bcrypt = require("bcrypt");
let compression = require("compression");
const saltRounds = 0;
const myPlaintextPassword = "123"; //minha senha
const someOtherPlaintextPassword = '1234'; //senha a ser testada

// @UseBefore(() => Auth.authenticate())
@JsonController("/cardapio")
export class CardapioController {
  @Inject() private cardapioService: CardapioService;

  @Post()
  @HttpCode(201)
  public httpPost(
    @Body({
      required: true
    })
    props: ICardapio
  ): Promise<any> {
    let cardapio = plainToClass(Cardapio, props);
    return this.cardapioService.create(cardapio);
  }

  @Get()
  public httpGetAll(): Promise<Cardapio[] | any> {
    return this.cardapioService.readAll();
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
    return this.cardapioService.readOne(id);
  }
}
