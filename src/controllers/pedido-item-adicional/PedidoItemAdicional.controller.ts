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
import {IitemPedidoAdicional,  ItemPedidoAdicional ,  ItemPedidoAdicionalService  } from "../../entities/pedido-item-adicional";
import Auth from "../../config/passport";

// @UseBefore(() => Auth.authenticate())
@JsonController("/pedidoadicionais")
export class PedidoItemAdicionalController {
  @Inject() private  itemPedidoAdicionalService: ItemPedidoAdicionalService;

  @Post()
  @HttpCode(201)
  public httpPost(
    @Body({
      required: true
    })
    props: IitemPedidoAdicional
  ): Promise<ItemPedidoAdicional | any> {
    let itemPedidoAdicional = plainToClass(ItemPedidoAdicional, props);
    return this.itemPedidoAdicionalService.create(itemPedidoAdicional);
  }

  @Get()
  public httpGetAll(): Promise<ItemPedidoAdicional[]> {
    return this.itemPedidoAdicionalService.readAll();
  }

  @Get("/:id")
  public httpGet(@Param("id") id: number): Promise<any> {
    return this.itemPedidoAdicionalService.readOne(id);
  }
}