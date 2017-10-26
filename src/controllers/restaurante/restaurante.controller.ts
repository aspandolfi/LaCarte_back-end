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
import {IRestaurante, Restaurante , RestauranteService } from "../../entities/restaurante";
import Auth from "../../config/passport";

// @UseBefore(() => Auth.authenticate())
@JsonController("/restaurante")
export class RestauranteController {
  @Inject() private  restauranteService:  RestauranteService;

  @Post()
  @HttpCode(201)
  public httpPost(
    @Body({
      required: true
    })
    props: IRestaurante
  ): Promise<Restaurante | any> {
    let restaurante = plainToClass(Restaurante, props);
    return this.restauranteService.create(restaurante);
  }

  @Get()
  public httpGetAll(): Promise<Restaurante[]> {
    return this.restauranteService.readAll();
  }

  @Get("/:id")
  public httpGet(@Param("id") id: number): Promise<any> {
    return this.restauranteService.readOne(id);
  }
}
