import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BlogModel } from "./blog.model";
import { CommentModel } from "./comment.model";

@Entity("users")
export class UserModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => BlogModel, (blog) => blog.author)
  blogs: BlogModel[];

  @OneToMany(() => CommentModel, (blog) => blog.user)
  comments: CommentModel[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: null })
  updatedAt: Date;
}
