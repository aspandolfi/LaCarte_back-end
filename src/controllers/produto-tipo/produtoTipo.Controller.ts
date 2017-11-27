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

// @UseBefore(() => Auth.authenticate())
@JsonController("/produtotipo")
export class ProdutoTipoController {
  @Inject() private  tipoProdutoService:  TipoProdutoService;

  @Post()
  @HttpCode(201)
  public httpPost(
    @Body({
      required: true
    })
    props: ITipoProduto
  ): Promise<TipoProduto | any> {
    let tipoProduto = plainToClass(TipoProduto, props);
    return this.tipoProdutoService.create(tipoProduto);
  }

  @Get()
  public httpGetAll(): Promise<TipoProduto[]> {
    return this.tipoProdutoService.readAll();
  }

  @Get("/:id")
  public httpGet(@Param("id") id: number): Promise<any> {
    return this.tipoProdutoService.readOne(id);
  }
}
