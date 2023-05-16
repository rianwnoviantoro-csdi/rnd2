import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserModel } from "./user.model";
import { BlogModel } from "./blog.model";

@Entity("comments")
export class CommentModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  body: string;

  @ManyToOne(() => UserModel, (user) => user.comments)
  user: UserModel;

  @ManyToOne(() => BlogModel, (blog) => blog.comments)
  @JoinColumn()
  blog: BlogModel;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: null })
  updatedAt: Date;
}
