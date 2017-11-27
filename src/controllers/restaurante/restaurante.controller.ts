import { plainToClass, classToPlain } from "class-transformer";
import {
  Body,
  Param,
  HttpCode,
  JsonController,
  Post,
  Get,
  UseBefore,
  Authorized,
  Put,
  Delete
} from "routing-controllers";
import { Inject } from "typedi";
import { IRestaurante, Restaurante, RestauranteService } from "../../entities/restaurante";

// @Authorized()
@JsonController("/restaurante")
export class RestauranteController {
  @Inject() private restauranteService: RestauranteService;

  @Post()
  @HttpCode(201)
  public httpPost(
    @Body({
      required: true
    })
    props: IRestaurante
    ): Promise<Restaurante | any> {
    let restaurante = plainToClass(Restaurante, props);
    return this.restauranteService.create(restaurante, props.cliente);
  }

  @Get()
  public async httpGetAll(): Promise<Restaurante[] | any> {
    let restaurantes = await this.restauranteService.readAll();
    return classToPlain(restaurantes);
    // return restaurantes;
  }

  @Get("/:id")
  public httpGet( @Param("id") id: number): Promise<any> {
    return this.restauranteService.readOne(id);
  }

  @Put()
  public async httpPut( @Body({ required: true }) props: IRestaurante): Promise<Restaurante | any> {
    const restaurante = plainToClass(Restaurante, props);
    return await this.restauranteService.update(restaurante);
  }

  @Delete("/:id")
  public async httpDelete( @Param("id") id: number): Promise<any> {
    return this.restauranteService.drop(id);
  }
}
