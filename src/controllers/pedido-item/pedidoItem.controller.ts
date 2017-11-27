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

// @UseBefore(() => Auth.authenticate())
@JsonController("/pedidoitem")
export class pedidoItem {
  @Inject() private  itemPedidoService:  ItemPedidoService;

  @Post()
  @HttpCode(201)
  public httpPost(
    @Body({
      required: true
    })
    props: IitemPedido
  ): Promise<IitemPedido | any> {
    let itemPedido = plainToClass(ItemPedido, props);
    return this.itemPedidoService.create(itemPedido);
  }

  @Get()
  public httpGetAll(): Promise<ItemPedido[]> {
    return this.itemPedidoService.readAll();
  }

  @Get("/:id")
  public httpGet(@Param("id") id: number): Promise<any> {
    return this.itemPedidoService.readOne(id);
  }
}
