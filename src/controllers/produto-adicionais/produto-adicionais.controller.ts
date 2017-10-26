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
import {IProdutoAdicionais, ProdutoAdicionais , ProdutoAdicionaisService } from "../../entities/produto-adicionais";
import Auth from "../../config/passport";

// @UseBefore(() => Auth.authenticate())
@JsonController("/ProdutoAdicionais")
export class ProdutoAdicionaisController {
  @Inject() private  ProdutoAdicionaisService:  ProdutoAdicionaisService;

  @Post()
  @HttpCode(201)
  public httpPost(
    @Body({
      required: true
    })
    props: IProdutoAdicionais
  ): Promise<ProdutoAdicionais | any> {
    let produtoAdicionais = plainToClass(ProdutoAdicionais, props);
    return this.ProdutoAdicionaisService.create(produtoAdicionais);
  }

  @Get()
  public httpGetAll(): Promise<ProdutoAdicionais[]> {
    return this.ProdutoAdicionaisService.readAll();
  }

  @Get("/:id")
  public httpGet(@Param("id") id: number): Promise<any> {
    return this.ProdutoAdicionaisService.readOne(id);
  }
}