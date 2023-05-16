import { ConnectionOptions } from "typeorm";
import { env } from "./env";
import { UserModel } from "../models/user.model";
import { BlogModel } from "../models/blog.model";
import { CommentModel } from "../models/comment.model";
import { TagModel } from "../models/tag.model";

export const DBConfig: ConnectionOptions = {
  type: "postgres",
  host: env.pgHost,
  port: env.pgPort,
  username: env.pgUser,
  password: env.pgPass,
  database: env.pgDBName,
  entities: [UserModel, BlogModel, CommentModel, TagModel],
  synchronize: true,
};
