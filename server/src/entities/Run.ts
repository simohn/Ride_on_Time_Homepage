import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Run extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float"})
  time: number;

  @Column()
  user_id: number;
  
  @Column()
  track_id: number;
}
 