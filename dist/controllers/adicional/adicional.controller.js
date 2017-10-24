// import { plainToClass } from "class-transformer";
// import {
//   Body,
//   Param,
//   HttpCode,
//   JsonController,
//   Post,
//   Get
// } from "routing-controllers";
// import { Inject } from "typedi";
// import { Adicional, AdicionalService } from "../../entities/adicional";
// @JsonController("/user")
// export class UserController {
//   @Inject() private userService: AdicionalService;
//   @Post()
//   @HttpCode(201)
//   public httpPost(
//     @Body({
//       required: true
//     })
//     props: IAdicional
//   ): Promise<any> {
//     let user = plainToClass(Adicional, props);
//     return this.userService.create(user);
//   }
//   @Get()
//   public httpGetAll(): Promise<User[]> {
//     return this.userService.readAll();
//   }
//   @Get("/:id")
//   public httpGet(@Param("id") id: number): Promise<any> {
//     return this.userService.readOne(id);
//   }
//   @Get("/email/:email")
//   public httpGetEmail(@Param("email") email: string): Promise<any> {
//     return this.userService.readOneByEmail(email);
//   }
// }
