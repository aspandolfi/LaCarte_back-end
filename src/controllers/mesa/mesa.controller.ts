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
import Auth from "../../config/passport";

@UseBefore(() => Auth.authenticate())
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
    return this.mesaService.create(mesa);
  }

  @Get()
  public httpGetAll(): Promise<Mesa[]> {
    return this.mesaService.readAll();
  }

  @Get("/:id")
  public httpGet(@Param("id") id: number): Promise<any> {
    return this.mesaService.readOne(id);
  }
}