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
import { IitemPedido ,  ItemPedido ,  ItemPedidoService  } from "../../entities/pedido-item";
import Auth from "../../config/passport";

// @UseBefore(() => Auth.authenticate())
@JsonController("/itemPedido")
export class PedidoController {
  @Inject() private  ItemPedidoService:  ItemPedidoService;

  @Post()
  @HttpCode(201)
  public httpPost(
    @Body({
      required: true
    })
    props: IitemPedido
  ): Promise<IitemPedido | any> {
    let itemPedido = plainToClass(ItemPedido, props);
    return this.ItemPedidoService.create(itemPedido);
  }

  @Get()
  public httpGetAll(): Promise<ItemPedido[]> {
    return this.ItemPedidoService.readAll();
  }

  @Get("/:id")
  public httpGet(@Param("id") id: number): Promise<any> {
    return this.ItemPedidoService.readOne(id);
  }
}