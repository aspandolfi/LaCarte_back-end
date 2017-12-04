import { ResponseData } from './../../entities/response-data/response-data.model';
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
import { IMesa, Mesa, MesaService } from "../../entities/mesa";

// @UseBefore(() => Auth.authenticate())
@JsonController("/mesa")
export class MesaController {
  @Inject() private mesaService: MesaService;

  @Post()
  @HttpCode(201)
  public httpPost(
    @Body({
      required: true
    })
    props: IMesa
  ): Promise<Mesa | any> {
    let mesa = plainToClass(Mesa, props);
    return this.mesaService.create(mesa,mesa.restaurante);
  }

  @Get()
  public httpGetAll(): Promise<Mesa[] | ResponseData> {
    return this.mesaService.readAll();
  }

  @Get("/:id")
  public httpGet(@Param("id") id: number): Promise<any> {
    return this.mesaService.readOne(id);
  }
}
