import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Track extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  track_name: string;

  @Column()
  park_name: string;
}
 