import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserModel } from "./user.model";
import { TagModel } from "./tag.model";
import { CommentModel } from "./comment.model";

@Entity("blogs")
export class BlogModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  body: string;

  @ManyToOne(() => UserModel, (user) => user.blogs)
  author: UserModel;

  @ManyToMany(() => TagModel)
  @JoinTable({ name: "blog_tags" })
  tags: TagModel[];

  @OneToMany(() => CommentModel, (comment) => comment.blog)
  comments: CommentModel[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: null })
  updatedAt: Date;
}
