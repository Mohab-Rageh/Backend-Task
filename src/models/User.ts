import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Role } from "./Role";
import { Blog } from "./Blog";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  roleId: number;

  @ManyToOne(() => Role, { eager: true, nullable: true })
  @JoinColumn({ name: "roleId" })
  role?: Role;

  @OneToMany(() => Blog, (blog) => blog.author)
  blogs?: Blog[];
}
