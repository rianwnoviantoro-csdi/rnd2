import { Response } from "express";
import { RequestWithUserProfile } from "../interfaces/token.interface";
import { UserModel } from "../models/user.model";
import { findOneById as findOneUserById } from "../services/user.service";
import slugify from "slugify";
import {
  findOneById as findOneBlogById,
  findOneBySlug as findOneBlogBySlug,
} from "../services/blog.service";
import { BlogModel } from "../models/blog.model";
import { IComment } from "../interfaces/comment.interface";
import { save } from "../services/comment.service";
import { CommentModel } from "../models/comment.model";

export const create = async (req: RequestWithUserProfile, res: Response) => {
  try {
    const payload: IComment = req.body;
    const slug: string = req.params.slug;

    const author: UserModel = await findOneUserById(req.profile?.id);
    const blog: BlogModel = await findOneBlogBySlug(slug);

    delete author.password;

    payload.user = author;
    payload.blog = blog;

    const result: CommentModel = await save(payload);

    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Comment created.",
      data: result,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
      return res.status(500).json({
        status: false,
        statusCode: 500,
        message: "Something went wrong.",
        data: [],
      });
    }
  }
};
