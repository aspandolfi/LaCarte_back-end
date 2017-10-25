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
import { IPedido, Pedido, PedidoService } from "../../entities/pedido";
import Auth from "../../config/passport";

@UseBefore(() => Auth.authenticate())
@JsonController("/pedido")
export class PedidoController {
  @Inject() private pedidoService: PedidoService;

  @Post()
  @HttpCode(201)
  public httpPost(
    @Body({
      required: true
    })
    props: IPedido
  ): Promise<Pedido | any> {
    let pedido = plainToClass(Pedido, props);
    return this.pedidoService.create(pedido);
  }

  @Get()
  public httpGetAll(): Promise<Pedido[]> {
    return this.pedidoService.readAll();
  }

  @Get("/:id")
  public httpGet(@Param("id") id: number): Promise<any> {
    return this.pedidoService.readOne(id);
  }
}