import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Park extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  parkname: string;
}
 