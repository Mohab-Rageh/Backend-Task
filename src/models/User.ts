import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Blog } from "./Blog";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: "Editor" })
  role: "Admin" | "Editor";

  @OneToMany(() => Blog, (blog) => blog.author)
  blogs: Blog[];
}
