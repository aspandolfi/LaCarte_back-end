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
import { IProduto,  Produto, ProdutoService  } from "../../entities/produto";
import Auth from "../../config/passport";

// @UseBefore(() => Auth.authenticate())
@JsonController("/Produto")
export class ProdutoController {
  @Inject() private  ProdutoService:  ProdutoService;

  @Post()
  @HttpCode(201)
  public httpPost(
    @Body({
      required: true
    })
    props: IProduto 
  ): Promise<Produto | any> {
    let produto = plainToClass(Produto, props);
    return this.ProdutoService.create(produto);
  }

  @Get()
  public httpGetAll(): Promise<Produto[]> {
    return this.ProdutoService.readAll();
  }

  @Get("/:id")
  public httpGet(@Param("id") id: number): Promise<any> {
    return this.ProdutoService.readOne(id);
  }
}