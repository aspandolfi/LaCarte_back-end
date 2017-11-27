import { plainToClass, classToPlain } from "class-transformer";
import {
    Body,
    Param,
    HttpCode,
    JsonController,
    Post,
    Get,
    UseBefore,
    Put
} from "routing-controllers";
import { Inject, Container } from "typedi";
import { ICliente, Cliente, ClienteService } from "../../entities/cliente";

// @UseBefore(() => Auth.authenticate())
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
    public async httpGetAll(): Promise<any> {
        const clientes = await this.clienteService.readAll();

        return classToPlain(clientes);
    }

    @Get("/:id")
    public httpGet( @Param("id") id: number): Promise<any> {
        return this.clienteService.readOne(id);
    }

    @Put()
    public async httpPut( @Body({ required: true }) props: ICliente): Promise<Cliente | any> {
        const cliente = plainToClass(Cliente, props);
        return await this.clienteService.update(cliente);
    }
}
