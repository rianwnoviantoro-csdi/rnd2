import { TagModel } from "../models/tag.model";
import { UserModel } from "../models/user.model";

export interface IBlog {
  id?: string;
  title?: string;
  slug?: string;
  body?: string;
  author?: UserModel;
  tags?: TagModel[];
  createdAt?: Date;
  updatedAt?: Date;
}
