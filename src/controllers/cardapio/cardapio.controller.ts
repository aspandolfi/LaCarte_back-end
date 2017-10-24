import { plainToClass } from "class-transformer";
import {
  Body,
  Param,
  HttpCode,
  JsonController,
  Post,
  Get,
  UseBefore
} from "routing-controllers";
import { Inject } from "typedi";
import { ICardapio, Cardapio, CardapioService } from "../../entities/cardapio";
import Auth from "../../config/passport";

@UseBefore(() => Auth.authenticate())
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
  ): Promise<Cardapio | any> {
    let cardapio = plainToClass(Cardapio, props);
    return this.cardapioService.create(cardapio);
  }

  @Get()
  public httpGetAll(): Promise<Cardapio[]> {
    return this.cardapioService.readAll();
  }

  @Get("/:id")
  public httpGet(@Param("id") id: number): Promise<any> {
    return this.cardapioService.readOne(id);
  }
}
