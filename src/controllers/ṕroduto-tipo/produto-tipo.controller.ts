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
import {ITipoProduto, TipoProduto , TipoProdutoService } from "../../entities/produto-tipo";
import Auth from "../../config/passport";

// @UseBefore(() => Auth.authenticate())
@JsonController("/tipoProduto")
export class TipoProdutooController {
  @Inject() private  TipoProdutoService:  TipoProdutoService;

  @Post()
  @HttpCode(201)
  public httpPost(
    @Body({
      required: true
    })
    props: ITipoProduto
  ): Promise<TipoProduto | any> {
    let tipoProduto = plainToClass(TipoProduto, props);
    return this.TipoProdutoService.create(tipoProduto);
  }

  @Get()
  public httpGetAll(): Promise<TipoProduto[]> {
    return this.TipoProdutoService.readAll();
  }

  @Get("/:id")
  public httpGet(@Param("id") id: number): Promise<any> {
    return this.TipoProdutoService.readOne(id);
  }
}