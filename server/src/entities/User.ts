import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  admin: boolean;
}
