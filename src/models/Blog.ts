import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column("text")
  content: string;

  @Column("simple-array") // Comma-separated values
  tags: string[];

  @ManyToOne(() => User, (user) => user.blogs)
  author: User;
}
