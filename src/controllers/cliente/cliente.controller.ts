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
import { ICliente, Cliente, ClienteService } from "../../entities/cliente";
import Auth from "../../config/passport";

@UseBefore(() => Auth.authenticate())
@JsonController("/cliente")
export class ClienteController {
  @Inject() private clienteService: ClienteService;

  @Post()
  @HttpCode(201)
  public httpPost(
    @Body({
      required: true
    })
    props: ICliente
  ): Promise<Cliente | any> {
    let cliente = plainToClass(Cliente, props);
    return this.clienteService.create(cliente);
  }

  @Get()
  public httpGetAll(): Promise<Cliente[]> {
    return this.clienteService.readAll();
  }

  @Get("/:id")
  public httpGet(@Param("id") id: number): Promise<any> {
    return this.clienteService.readOne(id);
  }
}