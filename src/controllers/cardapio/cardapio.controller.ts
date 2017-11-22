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
  public async httpGetAll(): Promise<Cardapio[] | any> {
    return await this.cardapioService.readAll();
  }

  @Get("/:id")
  public async httpGet( @Param("id") id: number): Promise<any> {
    return await this.cardapioService.readOne(id);
  }
}
