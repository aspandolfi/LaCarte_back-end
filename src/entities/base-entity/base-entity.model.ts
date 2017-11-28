import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  public id: number;

  @Column()
  @Exclude()
  public createdAt: Date;

  @Column()
  @Exclude()
  public updatedAt: Date;

  @VersionColumn({ default: 0 })
  @Exclude()
  public version: number;

  @BeforeInsert()
  create() {
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }

  @BeforeUpdate()
  update() {
    this.updatedAt = new Date();
    this.version++;
  }

}
