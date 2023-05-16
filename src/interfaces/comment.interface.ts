import { BlogModel } from "../models/blog.model";
import { UserModel } from "../models/user.model";

export interface IComment {
  body?: string;
  user?: UserModel;
  blog?: BlogModel;
  createdAt?: Date;
  updatedAt?: Date;
}
