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
@JsonController("/produtoadicionais")
export class ProdutoAdicionaisController {
  @Inject() private  produtoAdicionaisService:  ProdutoAdicionaisService;

  @Post()
  @HttpCode(201)
  public httpPost(
    @Body({
      required: true
    })
    props: IProdutoAdicionais
  ): Promise<ProdutoAdicionais | any> {
    let produtoAdicionais = plainToClass(ProdutoAdicionais, props);
    return this.produtoAdicionaisService.create(produtoAdicionais);
  }

  @Get()
  public httpGetAll(): Promise<ProdutoAdicionais[]> {
    return this.produtoAdicionaisService.readAll();
  }

  @Get("/:id")
  public httpGet(@Param("id") id: number): Promise<any> {
    return this.produtoAdicionaisService.readOne(id);
  }
}
