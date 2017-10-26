import { plainToClass } from "class-transformer";
import {
  Body,
  Param,
  HttpCode,
  JsonController,
  Post,
  Get
} from "routing-controllers";
import { Inject } from "typedi";
import { IAdicional ,Adicional, AdicionalService } from "../../entities/adicional";

@JsonController("/adicional")
export class AdicionalController {
  @Inject() private adicionalService: AdicionalService;

  @Post()
  @HttpCode(201)
  public httpPost(
    @Body({
      required: true
    })
    props: IAdicional
  ): Promise<any> {
    let adicional = plainToClass(Adicional, props);
    return this.adicionalService.create(adicional);
  }

  @Get()
  public httpGetAll(): Promise<Adicional[]> {
    return this.adicionalService.readAll();
  }

  @Get("/:id")
  public httpGet(@Param("id") id: number): Promise<any> {
    return this.adicionalService.readOne(id);
  }
}
