import { Exclude } from "class-transformer";
import {
  AbstractEntity,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn
} from "typeorm";

@AbstractEntity()
export abstract class BaseEntity {
  @PrimaryColumn("int", {
    type: "int",
    generated: true
  })
  public id: number;

  @CreateDateColumn()
  @Exclude()
  public createdAt?: Date;

  @UpdateDateColumn()
  @Exclude()
  public updatedAt?: Date;
  @VersionColumn()
  @Exclude()
  public version?: number;
}
