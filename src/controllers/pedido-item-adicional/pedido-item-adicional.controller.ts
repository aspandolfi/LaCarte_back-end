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
@JsonController("/ItemPedidoAdicional ")
export class ItemPedidoAdicionalssController {
  @Inject() private  ItemPedidoAdicionalService: ItemPedidoAdicionalService;

  @Post()
  @HttpCode(201)
  public httpPost(
    @Body({
      required: true
    })
    props: IitemPedidoAdicional
  ): Promise<ItemPedidoAdicional | any> {
    let itemPedidoAdicional = plainToClass(ItemPedidoAdicional, props);
    return this.ItemPedidoAdicionalService.create(itemPedidoAdicional);
  }

  @Get()
  public httpGetAll(): Promise<ItemPedidoAdicional[]> {
    return this.ItemPedidoAdicionalService.readAll();
  }

  @Get("/:id")
  public httpGet(@Param("id") id: number): Promise<any> {
    return this.ItemPedidoAdicionalService.readOne(id);
  }
}